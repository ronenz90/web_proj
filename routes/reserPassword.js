const user = await User.findOne({ email });

if (!user) {
    throw new Error("User does not exist");
}
let token = await Token.findOne({ userId: user._id });
if (token) { 
      await token.deleteOne()
};

