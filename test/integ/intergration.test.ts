import fs from 'fs'
import { execSync } from 'child_process'

import { MOCHI_TEMPLATE_REGEX, STRINGS } from '../../src/constants'

describe('integration', () => {
    beforeAll(() => {
        execSync('npm run clean')
        execSync('npm run build')
    })

    afterAll(() => {
        execSync('npm run clean')
    })

    test('creates files', () => {
        // invoke mochi
        execSync('node dist/src/cli.js create test/templates/prettierrc.mochi.mdx --destination=./test/tmp/')

        // assert
        expect(fs.existsSync('./test/tmp/.prettierrc')).toEqual(true)

        const templateContents = fs.readFileSync('./test/templates/prettierrc.mochi.mdx', { encoding: 'utf-8' })
        const fileContents = fs.readFileSync('./test/tmp/.prettierrc', { encoding: 'utf-8' })

        expect(templateContents.replace(MOCHI_TEMPLATE_REGEX, '')).toContain(fileContents)
    })

    test('informs user of success', () => {
        // invoke mochi
        const result = execSync('node dist/src/cli.js create test/templates/prettierrc.mochi.mdx --destination=./test/tmp/')

        // assert

        // TODO: Swap to using the string constants -- right now we have these values "chalked" so they come out encoded and therefore the jest match doesn't work

        // expect(result.toString()).toContain(STRINGS.create.success)
        // expect(result.toString()).toContain(STRINGS.create.filesCreated)
        // expect(result.toString()).toContain(STRINGS.create.thankYou)
        expect(result.toString()).toContain('Success!')
        expect(result.toString()).toContain('The following files were created')
        expect(result.toString()).toContain('Thank you')
    })
})
