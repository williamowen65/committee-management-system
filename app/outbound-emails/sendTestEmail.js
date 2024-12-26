import { sendNewContractSubmissionEmail } from "./newContractSubmission";
import { sendNewScholarshipEmail } from "./newScholarshipApplicant";

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