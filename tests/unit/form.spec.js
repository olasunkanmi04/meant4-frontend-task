import { shallowMount } from "@vue/test-utils";
import contactForm from "@/components/contactForm.vue";

describe("is name greater or equal to 5 but less than or equal to 50", () => {
  test("is name empty", () => {
    const name = "";
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#name");
    input.setValue(name);
    input.trigger("blur");
    expect(wrapper.vm.nameError).toBe("Name is required");
  });
  test("is name greater than or equal to 5", () => {
    const name = "Alabi";
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#name");
    input.setValue(name);
    input.trigger("blur");
    expect(wrapper.vm.name.length).toBeGreaterThanOrEqual(5);
    expect(wrapper.vm.nameError).toBe("");
  });
  test("is name less than 5", () => {
    const name = "Alab";
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#name");
    input.setValue(name);
    input.trigger("blur");
    expect(wrapper.vm.name.length).not.toBeGreaterThanOrEqual(5);
    expect(wrapper.vm.nameError).toBe(
      "Name must not be less than 5 characters"
    );
  });
  test("is name less than or equal to 50", () => {
    const name = "Alabi olasunkanmi";
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#name");
    input.setValue(name);
    input.trigger("blur");
    expect(wrapper.vm.name.length).toBeLessThanOrEqual(50);
    expect(wrapper.vm.nameError).toBe("");
  });
  test("is name greater than 50", () => {
    const name =
      "Alabi olasunkanmi Alabi olasunkanmi Alabi olasunkanmi Alabi olasunkanmi Alabi olasunkanmi Alabi olasunkanmi";
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#name");
    input.setValue(name);
    input.trigger("blur");
    expect(wrapper.vm.name.length).not.toBeLessThanOrEqual(50);
    expect(wrapper.vm.nameError).toBe(
      "Name must not be more than 50 characters"
    );
  });
});

describe("email is valid or not", () => {
  test("is email empty", () => {
    const email = "";
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#email");
    input.setValue(email);
    input.trigger("blur");
    expect(wrapper.vm.emailError).toBe("Email is required");
  });
  test("is email a valid email", () => {
    const email = "alabiolasunkanmi@outlook.com";
    const expected = expect.stringMatching(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    );
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#email");
    input.setValue(email);
    input.trigger("blur");
    expect(wrapper.vm.emailError).toBe("");
    expect(wrapper.vm.email).toEqual(expected);
  });
  test("is not email a valid email", () => {
    const email = "alabiolasunkanmi";
    const expected = expect.stringMatching(
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
    );
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#email");
    input.setValue(email);
    input.trigger("blur");
    expect(wrapper.vm.emailError).toBe("Please enter a valid email");
    expect(wrapper.vm.email).not.toEqual(expected);
  });
});

describe("message is required", () => {
  test("is message empty", () => {
    const message = "";
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#message");
    input.setValue(message);
    input.trigger("blur");
    expect(wrapper.vm.messageError).toBe("Message is required");
  });
  test("is message not empty and is less than 500", () => {
    const message = "This a good message";
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#message");
    input.setValue(message);
    input.trigger("blur");
    expect(wrapper.vm.messageError).toBe("");
    expect(wrapper.vm.message.length).toBeLessThanOrEqual(500);
  });
});

describe("subject is less than 100", () => {
  test("subject is less than 100", () => {
    const subject = "This a subject";
    const wrapper = shallowMount(contactForm);
    const input = wrapper.find("#subject");
    input.setValue(subject);
    expect(wrapper.vm.subject.length).toBeLessThanOrEqual(100);
  });
});

describe("send message", () => {
  test("send message", () => {
    const validData = {
      name: "Alabi",
      email: "alabiolasunkanmi@outook.com",
      subject: "This is a subject",
      message: "This is a good message"
    };
    const wrapper = shallowMount(contactForm);
    const form = wrapper.find("form");
    wrapper.find("#name").setValue(validData.name);
    wrapper.find("#email").setValue(validData.email);
    wrapper.find("#subject").setValue(validData.subject);
    wrapper.find("#message").setValue(validData.message);
    form.trigger("submit");
    expect(wrapper.vm.loading).toBe(true);
  });
});
