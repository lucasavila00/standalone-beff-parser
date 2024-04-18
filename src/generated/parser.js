
import vals from "./validators.js"; const { validators, add_path_to_errors, registerStringFormat, isCustomFormatInvalid } = vals;
const buildParsersInput = {
    "User": function(input) {
        let error_acc_0 = [];
        error_acc_0.push(...add_path_to_errors(validators.User(input), []));
        return error_acc_0;
    }
};


class BffParseError {
  constructor(errors) {
    this.errors = errors;
  }
}
function buildParsers() {
  let decoders ={};
  Object.keys(buildParsersInput).forEach(k => {
    let v = buildParsersInput[k];
    const safeParse = (input) => {
      const validation_result = v(input);
      if (validation_result.length === 0) {
        return { success: true, data: input };
      }
      return { success: false, errors: validation_result };
    }
    const parse = (input) => {
      const safe = safeParse(input);
      if (safe.success) {
        return safe.data;
      }
      throw new BffParseError(safe.errors)
    };
    decoders[k] = {
      parse, safeParse
    };
  });
  return decoders;
}

export default { buildParsers, registerStringFormat };