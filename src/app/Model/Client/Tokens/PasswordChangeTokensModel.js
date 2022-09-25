// Dependencies
import mongoose from "mongoose";

// Model
const PasswordChangeTokensModel = mongoose.model( "PasswordChangeTokens", {

	email: { type: String, required: true },
	token: { type: String, required: true },
	status: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	expires_at: { type: Date, required: true },
    
});

export default PasswordChangeTokensModel;