// tests/unit/OrderList.spec.js
import { mount } from "@vue/test-utils";
import OrderList from "@/components/OrderList.vue";

describe("OrderList.vue", () => {
  let wrapper;
  const orders = [
    { id: 1, productName: "Product 1", status: "Paid", date: "2024-10-10" },
    { id: 2, productName: "Product 2", status: "Pending", date: "2024-10-09" },
  ];

  beforeEach(() => {
    wrapper = mount(OrderList, {
      propsData: { orders },
    });
  });

  it("renders a list of orders", () => {
    expect(wrapper.findAll(".order-item")).toHaveLength(orders.length);
  });

  it("filters orders by status", async () => {
    // Filter by "Paid" status
    await wrapper.find('select[name="statusFilter"]').setValue("Paid");
    const filteredOrders = wrapper.findAll(".order-item");
    expect(filteredOrders).toHaveLength(1);
    expect(filteredOrders.at(0).text()).toContain("Product 1");
  });
});
