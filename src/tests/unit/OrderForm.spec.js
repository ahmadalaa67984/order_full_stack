// tests/unit/OrderForm.spec.js
import { mount } from "@vue/test-utils";
import OrderForm from "@/components/OrderForm.vue";

describe("OrderForm.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(OrderForm);
  });

  it("renders order form correctly", () => {
    expect(wrapper.find('input[name="productName"]').exists()).toBe(true);
    expect(wrapper.find('input[name="quantity"]').exists()).toBe(true);
    expect(wrapper.find('input[name="price"]').exists()).toBe(true);
  });

  it("validates form inputs correctly", async () => {
    // Submit without filling in the form
    await wrapper.find('button[type="submit"]').trigger("click");
    expect(wrapper.find(".error-message").text()).toContain(
      "This field is required"
    );

    // Fill in the form and submit
    await wrapper.find('input[name="productName"]').setValue("Product 1");
    await wrapper.find('input[name="quantity"]').setValue(2);
    await wrapper.find('input[name="price"]').setValue(100);
    await wrapper.find('button[type="submit"]').trigger("click");
    expect(wrapper.emitted()).toHaveProperty("submit");
  });
});
