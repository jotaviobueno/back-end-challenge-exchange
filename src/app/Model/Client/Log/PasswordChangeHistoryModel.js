// Dependencies
import mongoose from "mongoose";

// Model
const PasswordChangeHistoryModel = mongoose.model( "PasswordChangeHistory", {

	email: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default PasswordChangeHistoryModel;