

function add_path_to_errors(errors, path) {
  return errors.map((e) => ({ ...e, path: [...path, ...e.path] }));
}
    

const stringPredicates = {}
function registerStringFormat(name, predicate) {
  stringPredicates[name] = predicate;
}

function isCustomFormatInvalid(key, value) {
  const predicate = stringPredicates[key];
  if (predicate == null) {
    throw new Error("unknown string format: " + key);
  }
  return !predicate(value);
}

function User(input) {
    let error_acc_0 = [];
    if (typeof input == "object" && input != null) {
        if (Array.isArray(input["friends"])) {
            for(let index = 0; index < input["friends"].length; index++){
                const array_item_1 = input["friends"][index];
                error_acc_0.push(...add_path_to_errors(validators.User(array_item_1), [
                    "User",
                    "friends",
                    "[" + index + "]"
                ]));
            }
        } else {
            error_acc_0.push({
                "error_kind": "NotAnArray",
                "path": [
                    "User",
                    "friends"
                ],
                "received": input["friends"]
            });
        }
        if (typeof input["name"] != "string") {
            error_acc_0.push({
                "error_kind": "NotTypeof",
                "expected_type": "string",
                "path": [
                    "User",
                    "name"
                ],
                "received": input["name"]
            });
        }
    } else {
        error_acc_0.push({
            "error_kind": "NotAnObject",
            "path": [
                "User"
            ],
            "received": input
        });
    }
    return error_acc_0;
}
const validators = {
    User: User
};

export default { validators, isCustomFormatInvalid, registerStringFormat, add_path_to_errors };