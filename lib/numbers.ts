/*
Copyright 2018 - 2022 The Alephium Authors
This file is part of the alephium project.

The library is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with the library. If not, see <http://www.gnu.org/licenses/>.
*/

import { assert } from 'console'
import { Transaction } from '../api/api-explorer'

const MONEY_SYMBOL = ['', 'K', 'M', 'B', 'T']
const QUINTILLION = 1000000000000000000
const NUM_OF_ZEROS_IN_QUINTILLION = 18

export const BILLION = 1000000000

const produceZeros = (numberOfZeros: number): string => '0'.repeat(numberOfZeros)

const getNumberOfTrailingZeros = (numString: string) => {
  let numberOfZeros = 0

  for (let i = numString.length - 1; i >= 0; i--) {
    if (numString[i] === '0') {
      numberOfZeros++
    } else {
      break
    }
  }

  return numberOfZeros
}

const removeTrailingZeros = (numString: string, minNumberOfDecimals?: number) => {
  const numberOfZeros = getNumberOfTrailingZeros(numString)
  const numStringWithoutTrailingZeros = numString.substring(0, numString.length - numberOfZeros)

  if (minNumberOfDecimals) {
    assert(minNumberOfDecimals > 0, 'minNumberOfDecimals should be positive')

    const indexOfPoint = numStringWithoutTrailingZeros.indexOf('.')
    assert(indexOfPoint != -1, 'numString should contain decimal point')
    const numberOfDecimals = numStringWithoutTrailingZeros.length - 1 - indexOfPoint

    if (numberOfDecimals < minNumberOfDecimals) {
      return numStringWithoutTrailingZeros.concat(produceZeros(minNumberOfDecimals - numberOfDecimals))
    } else {
      return numStringWithoutTrailingZeros
    }
  } else {
    if (numStringWithoutTrailingZeros[numStringWithoutTrailingZeros.length - 1] === '.') {
      return numStringWithoutTrailingZeros.substring(0, numStringWithoutTrailingZeros.length - 1)
    } else {
      return numStringWithoutTrailingZeros
    }
  }
}

export const abbreviateAmount = (baseNum: bigint, showFullPrecision = false, nbOfDecimalsToShow?: number): string => {
  if (baseNum < BigInt(0)) return '???'

  // For abbreviation, we don't need full precision and can work with number
  const alphNum = Number(baseNum) / QUINTILLION
  const minNumberOfDecimals = alphNum >= 0.000005 && alphNum < 0.01 ? 3 : 2

  if (showFullPrecision) {
    const decimals = hasExactlyOneDecimalPoint(alphNum) ? 16 : NUM_OF_ZEROS_IN_QUINTILLION // Avoid precision issue edge case
    return removeTrailingZeros(alphNum.toFixed(decimals), minNumberOfDecimals)
  }

  const tinyAmountsMaxNumberDecimals = 5
  const numberOfDecimalsToDisplay = nbOfDecimalsToShow || minNumberOfDecimals

  if (alphNum < 0.001) {
    return removeTrailingZeros(alphNum.toFixed(tinyAmountsMaxNumberDecimals), minNumberOfDecimals)
  } else if (alphNum <= 1000000) {
    return addApostrophe(removeTrailingZeros(alphNum.toFixed(numberOfDecimalsToDisplay), minNumberOfDecimals))
  }

  const tier = alphNum < 1000000000 ? 2 : alphNum < 1000000000000 ? 3 : 4

  // get suffix and determine scale
  const suffix = MONEY_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  // Scale the bigNum
  // Here we need to be careful of precision issues
  const scaled = alphNum / scale

  return scaled.toFixed(numberOfDecimalsToDisplay) + suffix
}

export const calAmountDelta = (t: Transaction, id: string): bigint => {
  if (!t.inputs || !t.outputs) {
    throw 'Missing transaction details'
  }

  const inputAmount = t.inputs.reduce<bigint>((acc, input) => {
    return input.amount && input.address === id ? acc + BigInt(input.amount) : acc
  }, BigInt(0))
  const outputAmount = t.outputs.reduce<bigint>((acc, output) => {
    return output.address === id ? acc + BigInt(output.amount) : acc
  }, BigInt(0))

  return outputAmount - inputAmount
}

const hasExactlyOneDecimalPoint = (value: number): boolean => {
  if (Number.isInteger(value)) return false

  let str = value.toString()
  if (str.startsWith('-')) str = str.substring(1)

  if (str.indexOf('.') !== -1 && str.indexOf('e-') !== -1) {
    return parseInt(str.split('e-')[1]) + str.split('e-')[0].split('.')[1].length === 1
  } else if (str.indexOf('.') !== -1) {
    return str.split('.')[1].length === 1
  }
  return parseInt(str.split('e-')[1]) === 1
}

export const convertAlphToSet = (amount: string): bigint => {
  if (amount.length === 0 || amount.startsWith('-')) throw 'Invalid Alph amount'
  if (amount === '0') return BigInt(0)

  let cleanedAmount = amount

  if (cleanedAmount.includes('e')) {
    cleanedAmount = convertScientificToFloatString(cleanedAmount)
  }

  const numberOfDecimals = cleanedAmount.includes('.') ? cleanedAmount.length - 1 - cleanedAmount.indexOf('.') : 0
  const numberOfZerosToAdd = NUM_OF_ZEROS_IN_QUINTILLION - numberOfDecimals
  cleanedAmount = cleanedAmount.replace('.', '') + produceZeros(numberOfZerosToAdd)

  return BigInt(cleanedAmount)
}

export const convertScientificToFloatString = (scientificNumber: string): string => {
  let newNumber = scientificNumber
  const scientificNotation = scientificNumber.includes('e-')
    ? 'e-'
    : scientificNumber.includes('e+')
    ? 'e+'
    : scientificNumber.includes('e')
    ? 'e'
    : ''

  if (scientificNumber.startsWith('-')) {
    newNumber = newNumber.substring(1)
  }

  if (scientificNotation === 'e-') {
    const positionOfE = newNumber.indexOf(scientificNotation)
    const moveDotBy = Number(newNumber.substring(positionOfE + scientificNotation.length, newNumber.length))
    const positionOfDot = newNumber.indexOf('.')
    const amountWithoutEandDot = newNumber.substring(0, positionOfE).replace('.', '')
    if (moveDotBy >= positionOfDot) {
      const numberOfZeros = moveDotBy - (positionOfDot > -1 ? positionOfDot : 1)
      newNumber = `0.${produceZeros(numberOfZeros)}${amountWithoutEandDot}`
    } else {
      const newPositionOfDot = positionOfDot - moveDotBy
      newNumber = `${amountWithoutEandDot.substring(0, newPositionOfDot)}.${amountWithoutEandDot.substring(
        newPositionOfDot
      )}`
    }
  } else if (scientificNotation === 'e+' || scientificNotation === 'e') {
    const positionOfE = newNumber.indexOf(scientificNotation)
    const moveDotBy = Number(newNumber.substring(positionOfE + scientificNotation.length, newNumber.length))
    const numberOfDecimals = newNumber.indexOf('.') > -1 ? positionOfE - newNumber.indexOf('.') - 1 : 0
    const amountWithoutEandDot = newNumber.substring(0, positionOfE).replace('.', '')
    if (numberOfDecimals <= moveDotBy) {
      newNumber = `${amountWithoutEandDot}${produceZeros(moveDotBy - numberOfDecimals)}`
    } else {
      const positionOfDot = newNumber.indexOf('.')
      const newPositionOfDot = positionOfDot + moveDotBy
      newNumber = `${amountWithoutEandDot.substring(0, newPositionOfDot)}.${amountWithoutEandDot.substring(
        newPositionOfDot
      )}`
    }
  }

  if (scientificNumber.startsWith('-')) {
    newNumber = `-${newNumber}`
  }

  return newNumber
}

export const addApostrophe = (numString: string): string => {
  const integralPart = numString.split('.')[0]

  if (integralPart.length > 3) {
    return `${integralPart.slice(0, -3)}'${integralPart.slice(-3)}${
      numString.includes('.') ? `.${numString.split('.')[1]}` : ''
    }`
  }

  return numString
}

export const convertSetToAlph = (amountInSet: bigint): string => {
  const amountInSetStr = amountInSet.toString()

  if (amountInSetStr === '0') return amountInSetStr

  const positionForDot = amountInSetStr.length - NUM_OF_ZEROS_IN_QUINTILLION
  const withDotAdded =
    positionForDot > 0
      ? amountInSetStr.substring(0, positionForDot) + '.' + amountInSetStr.substring(positionForDot)
      : '0.' + produceZeros(NUM_OF_ZEROS_IN_QUINTILLION - amountInSetStr.length) + amountInSetStr
  return removeTrailingZeros(withDotAdded)
}