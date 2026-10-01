import { test, expect } from '@playwright/test';

test.beforeEach( async({page}) => {
  await page.goto('/')
})

test('Pet type name can be changed from cat to rabbit and back', async ({page}) => {
  await page.getByRole('link', { name: 'Pet Types', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Pet Types', exact: true })).toBeVisible()

  const firstPetTypeName = page.locator('tbody tr').first().getByRole('textbox')
  const catRow = page.getByRole('row').filter({
    has: page.getByRole('cell', { name: 'cat', exact: true })
  })
  await catRow.getByRole('button', { name: 'Edit', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Edit Pet Type', exact: true })).toBeVisible()

  await expect(page.getByRole('textbox')).toHaveValue('cat')
  await page.getByRole('textbox').fill('rabbit')
  await page.getByRole('button', { name: 'Update', exact: true }).click()
  await expect(firstPetTypeName).toHaveValue('rabbit')

  const rabbitRow = page.getByRole('row').filter({
    has: page.getByRole('cell', { name: 'rabbit', exact: true })
  })
  await rabbitRow.getByRole('button', { name: 'Edit', exact: true }).click()
  await expect(page.getByRole('textbox')).toHaveValue('rabbit')
  await page.getByRole('textbox').fill('cat')
  await page.getByRole('button', { name: 'Update', exact: true }).click()
  await expect(firstPetTypeName).toHaveValue('cat')
});
