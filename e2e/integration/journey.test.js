const mockServerURL = `http://localhost:3001`

const timestamp = 1559822173490;
const thanks = '#NailedItThank you! Your submission is now on its way to us.';

const initialData = {
    firstName: 'Jane',
    lastName: 'Doe',
    city: 'London',
    email: 'jane.doe@morgue.org',
    phone: '01189998819991197253'
};

const codeData = {
    codeExpertise: {
        "HTML/CSS": "5",
        "JavaScript": "4",
        "React": "3",
        "SQL/Mongo": "2",
        "Agile Methodologies": "1"
    },
    otherCodeExpertise: "Rock star developer, but humble",
    availableOnWeekends: "Yes"
};

const orgData = {
    skillSets: {
        'Accounting / Bookkeeping': true,
        'Event Management': true
    },
    availability: {
        'During our classes on Saturdays/Sundays': true
    }
};

beforeEach(() => {
    cy.request('POST', `${mockServerURL}/_reset`);
    cy.clock(timestamp);

    cy.visit('/');
});

it('can submit a code-only form', () => {
    const extra = { 
        fieldsOfInterest: { 
            'Teaching code or agile methodologies': true 
        }
    };

    cy.fillInitialForm({ ...initialData, ...extra }, 'Next');
    cy.fillCodeForm(codeData, 'Submit');
    cy.log(`submitting data: ${JSON.stringify(codeData)}`)

    cy.get('.applicationForm_thankYou').should('contains.text', thanks);

    cy.request(`${mockServerURL}/_calls`).then((response) => {
        cy.log(JSON.stringify(response.body))
        expect(response.body[0].body).to.deep.eq({
            Authorization: `Timestamp ${timestamp}`,
            ...initialData,
            ...extra,
            ...codeData
        });
    });
});

// it('can submit an org-only form', () => {
//     const extra = { fieldsOfInterest: { 'Running and growing the organisation': true } };

//     cy.fillInitialForm({ ...initialData, ...extra }, 'Next');
//     cy.fillOrgForm(orgData, 'Submit');

//     cy.get('.applicationForm_thankYou').should('contains.text', thanks);

//     cy.request(`${mockServerURL}/_calls`).then((response) => {
//         expect(response.body[0].body).to.deep.eq({
//             Authorization: `Timestamp ${timestamp}`,
//             ...initialData,
//             ...extra,
//             ...orgData
//         });
//     });
// });

// it('can submit both', () => {
//     const extra = { fieldsOfInterest: {
//         'Running and growing the organisation': true,
//         'Teaching code or agile methodologies': true
//     } };

//     cy.fillInitialForm({ ...initialData, ...extra }, 'Next');
//     cy.fillCodeForm(codeData, 'Next');
//     cy.fillOrgForm(orgData, 'Submit');

//     cy.get('.applicationForm_thankYou').should('contains.text', thanks);

//     cy.request(`${mockServerURL}/_calls`).then((response) => {
//         expect(response.body[0].body).to.deep.eq({
//             Authorization: `Timestamp ${timestamp}`,
//             ...initialData,
//             ...extra,
//             ...codeData,
//             ...orgData
//         });
//     });
// });

