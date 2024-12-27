import { sendNewApplicationEmail } from "./newApplicationReceived.js";
import { sendNewContractSubmissionBoardEmail, sendNewContractSubmissionEmail } from "./newContractSubmission.js";
import { sendNewScholarshipEmail } from "./newScholarshipApplicant.js";

export async function sendTestEmail() {


    // TEST #1: send email to the artist

    const user = {
        artistDetails: {
            firstName: 'William',
            lastName: 'Owen',
            email: 'william.owen.dev@gmail.com'
        }
    }

    const transaction = {
        id: '12345',
        amount: {
            value: 100,
            currency_code: 'USD'
        },
        status: 'Completed'
    }

    // sendNewContractSubmissionEmail(user, transaction)

    // // TEST #2: send email to the board members

    // sendNewContractSubmissionBoardEmail(user, transaction)


    // sendNewScholarshipEmail({
    //     name: 'William Owen',
    // })
    sendNewApplicationEmail({
        firstName: 'William',
        lastName: 'Owen',
    })

    
}