import contractReceived from './index.html.txt';
import { createCustomElement, evaluateTemplate } from '../../../utils/custom-element';
import './style.scss';




createCustomElement('contract-received', function () {


}, contractReceived, '', {
    attributes: [
        'firstName',
        'lastName',
        'membershipPaid',
        'scholarshipApplied',
        'studioSharingAnswer',
        'artisticDemonstration',
        'artistStatement',
        'artistTagline',
        'businessEmail',
        'facebook',
        'instagram',
        'mailingAddress',
        'membershipPaid',
        'personalEmail',
        'phone',
        'studioAddress',
        'website',
        'committeeRoles',
        'artistInStudioImage',
        'brochureImage',
        'digitalImage1',
        'digitalImage2',
        'digitalImage3',
        'signature',
        'medium'
    ],
});
