import { Utils } from "../../utils/Utils";

/**
 * Centralized validation methods for form fields.
 * Each method returns a string error message or `undefined` when valid.
 */
export const validateMethod = {
  /**
   * Required field validator. (keeps backwards-compatible key `validateMendatory` below)
   */
  validateMandatory: (value: string) => {
    const v = (value ?? '').toString();
    if (Utils.isEmpty(v)) return 'Please fill this field';
    return undefined;
  },

  // backward-compatible alias (avoid breaking existing callers)
  validateMendatory: (value: string) => validateMethod.validateMandatory(value),

  validateFullName: (value: string) => {
    const v = (value ?? '').toString();
    const str = v.replace(/^\s+/g, '');
    if (Utils.isEmpty(v)) return 'Please enter your name';
    if (str.length < 3) return 'Name must be at least 3 characters';
    return undefined;
  },

  validateDescription: (value: string) => {
    const v = (value ?? '').toString();
    const str = v.replace(/^\s+/g, '');
    if (Utils.isEmpty(v)) return 'Please enter a description';
    if (str.length < 3) return 'Description must be at least 3 characters';
    return undefined;
  },

  validateEmail: (value: string) => {
    const v = (value ?? '').toString().trim();
    if (Utils.isEmpty(v)) return 'Please enter an email address';
    if (!Utils.isEmailValid(v)) return 'Please enter a valid email address';
    return undefined;
  },

  validatePhone: (value: string) => {
    const v = (value ?? '').toString().trim();
    if (Utils.isEmpty(v)) return 'Please enter mobile number';

    // accept only digits for length check
    const digits = v.replace(/\D/g, '');
    if (digits.length !== 10) return 'Please enter a 10 digit mobile number';
    const isValid = !!v.match(Utils.exp_pattern_mobile);
    if (!isValid) return 'Please enter a valid mobile number';
    return undefined;
  },

  validatePassword: (value: string) => {
    const v = (value ?? '').toString();
    const strongPasswordRe = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (Utils.isEmpty(v)) return 'Please enter a password';
    if (v.length < 8) return 'Password must be at least 8 characters';
    if (!strongPasswordRe.test(v)) return 'Password must include an uppercase letter and a special character';
    return undefined;
  },
};


