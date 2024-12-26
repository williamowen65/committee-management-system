import { sendNewContractSubmissionEmail } from "./newContractSubmission.js";
import { sendNewScholarshipEmail } from "./newScholarshipApplicant.js";

export async function  sendTestEmail(){

    const user = {
        firstName: 'William',
        lastName: 'Owen',
        email: 'william.owen.dev@gmail.com'
    }

    const transaction = {
        id: '12345',
        amount: {
            value: 100,
            currency_code: 'USD'
        },
        status: 'Completed'
    }

    sendNewContractSubmissionEmail(user, transaction)
    
    // sendNewScholarshipEmail({
    //     firstName: 'William',
    //     lastName: 'Owen',
    //     email: ''
    // })
}