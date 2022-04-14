/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, assert } from 'chai'
import { Result } from '../../../../src/shared/core/result'

describe('Result Unit Tests', () => {

    it('Should create a new result', () => {
        const successValue = 'Success'
        const result = Result.success<string>(successValue)
        expect(result.isSuccess).to.equal(true)
        expect(result.isFailure).to.equal(false)
        expect(result.value).to.equal(successValue)
        try {
            result.error
            assert.fail('result.error should have failed')
        }
        catch(error) {
            const errorMessage = (error instanceof Error) ? error.message : ''
            expect(errorMessage).is.equal('Invalid Operation. Success result does not have an error.')
        }
    })

    it('Operation status is not Success: Should return an error message', () => {
        const errorMessage = 'someErrorMessage'
        const result = Result.failure<string>(errorMessage)
        expect(result.isSuccess).to.equal(false)
        expect(result.isFailure).to.equal(true)
        expect(result.error).to.equal(errorMessage)
        try {
            result.value
            assert.fail('result.value should have failed')
        }
        catch(error) {
            const errorMessage = (error instanceof Error) ? error.message : ''
            expect(errorMessage).is.equal('Invalid Operation. Failure result does not have a value.')
        }
    })

    it('Should create a new result with Null value', () => {
        const result = Result.success<string | null>(null)
        expect(result.isSuccess).to.equal(true)
        expect(result.value).to.be.deep.eq(null)
    })

    it('Should create a new result with undefined value', () => {
        const result = Result.success<string | undefined>(undefined)
        expect(result.isSuccess).to.equal(true)
        expect(result.value).to.be.deep.eq(undefined)
    })

    it('Should create a new result with False boolean value', () => {
        const result = Result.success<boolean>(false)
        expect(result.isSuccess).to.equal(true)
        expect(result.value).to.be.deep.eq(false)
    })
})
