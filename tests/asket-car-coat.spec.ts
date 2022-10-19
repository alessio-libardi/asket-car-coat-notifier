import { test, expect } from "@playwright/test";

const product = {
  name: "Car Coat",
  slug: "car-coat",
};
const color = { name: "Dark Navy", slug: "dark-navy" };

const sizes = [
  {
    label: "XS",
    lengths: [{ label: "Short" }, { label: "Regular" }, { label: "Long" }],
  },
];

test.describe(`Asket ${color.name} ${product.name}`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      `https://www.asket.com/it/mens/outerwear/${product.slug}-${color.slug}`
    );
  });

  for (const size of sizes) {
    test(`${size.label} is out of stock`, async ({ page }) => {
      const info = await page.locator(".product-page__info");

      await expect(info).toContainText(`The ${product.name}`);
      await expect(info).toContainText(color.name);

      const actions = info.locator(".product-page__actions");
      await expect(actions).toContainText(/Select Size/);

      await wait();

      await info.locator(".select-box >> nth=0").click();
      info.locator(`span[data-label="${size.label}"]`).click();

      await wait();

      for (const length of size.lengths) {
        await info.locator(".select-box >> nth=1").click();
        await page.locator(`span[data-label="${length.label}"]`).click();

        await expect(actions).toContainText(/Out of Stock/, {
          timeout: 1000,
        });
      }
    });
  }
});

async function wait() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
