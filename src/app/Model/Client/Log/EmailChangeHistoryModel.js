// Dependencies
import mongoose from "mongoose";

// Model
const EmailChangeHistoryModel = mongoose.model( "EmailChangeHistory", {

	email: { type: String, required: true },
	old_email: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
    
});

export default EmailChangeHistoryModel;