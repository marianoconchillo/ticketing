import { Schema, model, Model } from "mongoose";

// Describes the properties that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// Describes the properties that a User Model has
interface UserModel extends Model<any> {
  build: (attrs: UserAttrs) => any;
}

const userSchema = new Schema<UserAttrs>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<any, UserModel>("User", userSchema);

export { User };
