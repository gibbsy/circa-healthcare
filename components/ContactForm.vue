<template>
  <div class="contact-form-container flex-col-12 flex-col-lg-8">
    <form
      id="contact-form"
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      @submit.prevent="handleSubmit"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p class="hidden">
        <label
          >Don’t fill this out if you’re human: <input name="bot-field"
        /></label>
      </p>
      <fieldset class="form-grid">
        <div class="form-row enquiry-type clear-row">
          <label class="enquiry hidden" for="enquiry">Nature of enquiry</label>
          <div class="select-container">
            <select id="enquiry" v-model="enquiry" name="enquiry" required>
              <option disabled selected value="">Nature of enquiry</option>
              <option value="sales">Say hello</option>
              <option value="support">New business</option>
              <option value="careers">Careers</option>
            </select>
          </div>
        </div>
        <div class="form-row text firstname">
          <label class="firstname hidden" for="firstname">First name</label>
          <input
            id="firstname"
            v-model="firstname"
            name="firstname"
            type="text"
            placeholder="First name"
            required
          />
        </div>

        <div class="form-row text lastname">
          <label class="lastname hidden" for="lastname">Last name</label>
          <input
            id="lastname"
            v-model="lastname"
            name="lastname"
            type="text"
            placeholder="Last name"
            required
          />
        </div>

        <div class="form-row text email">
          <label class="email hidden" for="email">Email address</label>
          <input
            id="email"
            v-model="email.value"
            name="email"
            type="email"
            placeholder="Email address"
            required
          />
        </div>
        <div class="form-row text website">
          <label class="website hidden" for="website">Company website</label>
          <input
            id="website"
            v-model="website"
            name="website"
            type="text"
            placeholder="Website"
          />
        </div>
        <textarea
          class="form-row form-row--wide"
          name="message"
          value="message"
          placeholder="Message"
        ></textarea>
        <transition name="quick-fade" mode="out-in">
          <div
            v-show="enquiry === 'careers'"
            class="form-row form-row--wide upload"
          >
            <label for="cv">Upload CV</label>
            <input
              id="cv"
              type="file"
              name="cv"
              class="cv-upload"
              accept=".doc, .pdf, image/*"
            />
          </div>
        </transition>
        <div class="form-row form-row--wide terms">
          <input
            id="terms"
            v-model="acceptTerms"
            required
            type="checkbox"
            name="accept-terms"
          />
          <label for="terms"
            ><p>
              Before submitting this form you must agree Circa’s
              <nuxt-link to="/"
                >Terms and Conditions and Privacy Notice.</nuxt-link
              >
            </p></label
          >
        </div>
      </fieldset>
      <transition name="quick-fade" mode="out-in">
        <div v-if="submitted && errors.length" class="submit-row error">
          <p>
            Something went wrong on our end. Sorry about that. You can still
            contact us at
            <a href="mailto:mailto:info@circahealthcare.com" class="common-Link"
              >info@circahealthcare.com</a
            >
          </p>
        </div>
      </transition>
      <transition name="quick-fade" mode="out-in">
        <div v-show="submitted && !errors.length" class="submit-row thanks">
          <p>
            <strong>Thanks for connecting.</strong> Someone from our team will
            be in touch soon.
          </p>
        </div>
      </transition>
      <div v-show="!submitted" class="submit-row">
        <button
          type="submit"
          class="cta-primary submit-btn"
          :disabled="submitting"
        >
          <span class="arrow"> <cta-arrow /> </span>Submit form
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import CtaArrow from "~/assets/cta_arrow_small.svg?inline";

export default {
  components: { CtaArrow },
  props: {
    enquiryPrefill: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      errors: [],
      firstname: null,
      lastname: null,
      email: { value: null, valid: false },
      website: null,
      enquiry: "",
      acceptTerms: "",
      submitting: false,
      submitted: false,
    };
  },
  watch: {
    enquiryPrefill(val) {
      if (val.length > 0) {
        this.enquiry = val;
      }
    },
    // watching nested property
    "email.value"(value) {
      this.validate("email", value);
      console.log(value, this.email.valid);
    },
  },
  methods: {
    validate(type, value) {
      if (type === "email") {
        this.email.valid = !!this.validEmail(value);
      }
    },
    validEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    handleSubmit(e) {
      e.preventDefault();
      console.log("submit");
      if (!this.email.valid) {
        this.errors.push("Please enter a valid email address.");
        return;
      }
      this.submitting = true;
      const myForm = document.getElementById("contact-form");
      const formData = new FormData(myForm);
      const input = document.getElementById("cv");
      formData.append("UserCV", input.files[0]);
      // if (input.files.length) {
      // }
      // console.log(formData);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: new URLSearchParams(formData),
      })
        .then(() => {
          setTimeout(() => {
            this.submitted = true;
          }, 100);
        })
        .catch((error) => {
          this.errors.push(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/assets/style/components/contact-form";
</style>
