<template>
  <form autocomplete="contact_form" class="form" @submit.prevent="submit">
    <div
      class="form__notification"
      v-if="error || success"
      :style="[error ? { background: '#ffcdbb' } : { background: '#36b936' }]"
    >
      <p class="form__notification-text">
        {{ error ? error : "Message sent successfully!" }}
      </p>
    </div>
    <div class="form__group">
      <label for="name" class="form__label">Name*</label>
      <input
        type="text"
        id="name"
        v-model="name"
        required
        class="form__input"
        :class="{ error: nameError }"
        maxlength="50"
        minlength="5"
        @blur="nameCheck"
      />
      <small class="form__error">{{ nameError }}</small>
    </div>
    <div class="form__group">
      <label for="email" class="form__label">Email*</label>
      <input
        @blur="emailCheck"
        type="email"
        v-model="email"
        required
        :class="{ error: emailError }"
        id="email"
        class="form__input"
      />
      <small class="form__error">{{ emailError }}</small>
    </div>
    <div class="form__group">
      <label for="subject" class="form__label">Subject</label>
      <input
        type="text"
        v-model="subject"
        id="subject"
        class="form__input"
        maxlength="100"
      />
    </div>
    <div class="form__group">
      <label for="message" class="form__label">Message*</label>
      <textarea
        @blur="messageCheck"
        :class="{ error: messageError }"
        v-model="message"
        required
        name="message"
        id="message"
        class="form__textarea"
        maxlength="500"
      ></textarea>
      <small class="form__error">{{ messageError }}</small>
    </div>

    <button class="form__btn" type="submit">
      {{ loading ? "Sending..." : "SEND" }}
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "contactForm",
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
      success: false,
      loading: false,
      error: "",
      nameError: "",
      emailError: "",
      messageError: ""
    };
  },
  methods: {
    submit() {
      this.loading = true;
      axios
        .post("https://5d9f7fe94d823c0014dd323d.mockapi.io/api/message", {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message
        })
        .then(response => {
          this.loading = false;
          if (response.status === 201) {
            this.name = "";
            this.email = "";
            this.subject = "";
            this.message = "";
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 5000);
          }
        })
        .catch(error => {
          this.loading = false;
          this.error = error.response.data.message;
          setTimeout(() => {
            this.error = "";
          }, 5000);
          return error;
        });
    },
    nameCheck(e) {
      const val = e.target.value;
      if (val.length === 0) {
        this.nameError = "Name is required";
      } else if (val.length < 5) {
        this.nameError = "Name must not be less than 5 characters";
      } else if (val.length > 50) {
        this.nameError = "Name must not be more than 50 characters";
      } else {
        this.nameError = "";
      }
    },
    emailCheck(e) {
      const val = e.target.value;
      if (val.length === 0) {
        this.emailError = "Email is required";
      } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(val)) {
        this.emailError = "Please enter a valid email";
      } else {
        this.emailError = "";
      }
    },
    messageCheck(e) {
      const val = e.target.value;
      if (val.length === 0) {
        this.messageError = "Message is required";
      } else {
        this.messageError = "";
      }
    }
  },
  watch: {
    name(val) {
      if (val.length >= 5 && val.length <= 50) {
        this.nameError = "";
      }
    },
    email(val) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(val)) {
        this.emailError = "";
      }
    },
    message(val) {
      if (val.length > 0) {
        this.messageError = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  margin: auto;
  box-sizing: border-box;

  &__group {
    width: 100%;
    margin-bottom: 16px;
  }
  &__label {
    display: block;
    margin-bottom: 8px;
  }
  &__input {
    width: 100%;
    height: 40px;
    color: #2c3e50;
    border-radius: 5px;
    border: 1px solid #2c3e50;
    padding: 0 8px;
    font-size: 14px;
    &:focus {
      outline: none;
      border-color: #4fc1ea;
    }
    &.error {
      border-color: red;
    }
  }
  &__textarea {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    width: 100%;
    color: #2c3e50;
    height: 200px;
    border-radius: 5px;
    border: 1px solid #2c3e50;
    padding: 8px;
    font-size: 14px;
    &:focus {
      outline: none;
      border-color: #4fc1ea;
    }
    &.error {
      border-color: red;
    }
  }
  &__btn {
    background: #4fc1ea;
    border: none;
    width: 200px;
    border-radius: 5px;
    height: 40px;
    color: #fff;
    cursor: pointer;
    display: block;
    margin-left: auto;
  }
  &__notification {
    width: 100%;
    height: auto;
    padding: 10px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    border-radius: 5px;

    p {
      color: #2c3e50;
      font-weight: bold;
      font-size: 14px;
      line-height: 18px;
    }
  }
  &__error {
    color: red;
  }
}
</style>
