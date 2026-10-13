/**
 * Terms & Conditions and Privacy Policy copy.
 *
 * English only, by design: legal text is kept out of the i18n dictionaries so
 * it isn't machine-translated into something that could be read differently.
 * Strings go through <RichText>, so `**bold**` and the `{tokens}` listed in
 * `LEGAL_LINKS` (see legal-document.tsx) are available. `{phone}` and `{address}` are
 * filled in from lib/site.ts so the details live in one place.
 */

/** A string is a paragraph; a string[] is a bulleted list. */
export type LegalBlock = string | string[];

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalContent = {
  title: string;
  description: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
};

export const terms: LegalContent = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you use the Singapore Math Wizard website, enrol your child in our online classes and pay through Billplz.",
  updated: "14 October 2026",
  intro: [
    "Welcome to Singapore Math Wizard. These Terms & Conditions (the **Terms**) govern your use of www.sgmathwizard.com and our online Singapore Math classes, learning materials and related services (together, the **Services**).",
    "Please read them carefully. By using our website, registering a student or making a payment, you agree to be bound by these Terms and by our {privacy}.",
  ],
  sections: [
    {
      id: "about",
      heading: "About us and these Terms",
      blocks: [
        "The Services are operated by Singapore Math Wizard (**we**, **us**, **our**), {address}. You can reach us at {email} or on WhatsApp at {phone}.",
        "If you do not agree with any part of these Terms, please do not use the website or the Services.",
      ],
    },
    {
      id: "eligibility",
      heading: "Eligibility and accounts",
      blocks: [
        "Our Services are designed for primary school students. A parent or legal guardian aged 18 or above must register the student, accept these Terms on the student's behalf and is responsible for the student's use of the Services.",
        "When you register, you agree to:",
        [
          "give accurate, current and complete information about yourself and the student;",
          "keep your login details confidential and tell us promptly if you suspect unauthorised use of your account; and",
          "be responsible for all activity that takes place under your account.",
        ],
      ],
    },
    {
      id: "services",
      heading: "Our Services",
      blocks: [
        "We provide live online Singapore Math classes (1-to-1 and peer learning), access to the Practicle learning platform for practice and homework, and progress updates for parents.",
        "Classes are conducted over third-party video conferencing software. You are responsible for a suitable device, a stable internet connection and any software needed to attend. Lesson schedules, teachers and class formats may change from time to time, and we will make reasonable efforts to tell you in advance.",
      ],
    },
    {
      id: "trial",
      heading: "Free trial",
      blocks: [
        "We may offer a free trial or consultation session. No payment information is required for the free trial. A free trial is limited to one per student, and we may decline or end a trial where we reasonably believe it is being misused.",
      ],
    },
    {
      id: "fees",
      heading: "Fees and payment",
      blocks: [
        "Fees for each package are shown on our {packages} page in Malaysian Ringgit (RM) and may be updated from time to time. The price shown when you sign up is the price you agree to pay for that billing period.",
        [
          "Paid plans are billed in advance, either monthly or yearly depending on the billing period you choose.",
          "Unless you cancel, your plan renews at the end of each billing period at the then-current price.",
          "You are responsible for any bank, card or currency conversion charges imposed by your own provider.",
          "If a payment fails, we may suspend access to the Services until the amount due has been paid.",
        ],
      ],
    },
    {
      id: "billplz",
      heading: "Payments through Billplz",
      blocks: [
        "Online payments are processed by {billplz}, an independent third-party payment gateway. When you pay, you are directed to a Billplz payment page and, depending on the method you choose, to your bank or payment provider to authorise the transaction.",
        [
          "Your use of Billplz is also subject to Billplz's own terms and privacy policy.",
          "We do not see or store your full card number, online banking credentials or other sensitive payment authentication details.",
          "We receive confirmation from Billplz of whether a payment succeeded, along with a transaction reference, so that we can activate your plan and keep our records.",
          "We are not responsible for delays, errors or outages on the Billplz platform or at your bank, but we will help you resolve payment issues where we can.",
        ],
      ],
    },
    {
      id: "cancellation",
      heading: "Cancellation, changes and refunds",
      blocks: [
        "You may change or cancel your subscription at any time from within our system or by contacting us at {email}. Cancellation takes effect at the end of the billing period that has already been paid for, and you will keep access until then.",
        "Fees already paid are generally non-refundable, including for classes that were scheduled but not attended. Nothing in this section limits any right you have under applicable consumer protection law, and we may, at our discretion, offer a refund or credit where we are unable to deliver the classes you paid for.",
      ],
    },
    {
      id: "attendance",
      heading: "Attendance and rescheduling",
      blocks: [
        [
          "**1-to-1 classes:** you may discuss and reschedule a class with your assigned teacher.",
          "**Peer learning classes:** please give us at least 2 to 3 days' notice if the student cannot attend. If notice is not given, we will provide a recording of the missed session where one is available.",
        ],
        "Replacement classes and recordings are provided as a courtesy and have no cash value. Unused lessons do not carry over beyond the paid billing period unless we agree otherwise in writing.",
      ],
    },
    {
      id: "conduct",
      heading: "Student and parent conduct",
      blocks: [
        "To keep classes safe and effective for everyone, you and the student agree to:",
        [
          "keep cameras on during class so teachers can guide the student properly;",
          "treat teachers, staff and other students with respect, and not harass, bully or discriminate against anyone;",
          "not record, photograph, copy or share any class, chat or other student's image or voice without our written permission;",
          "not share your account with anyone outside your household; and",
          "not misuse the website or the Practicle platform, including by attempting to gain unauthorised access, introduce malicious code or disrupt the Services.",
        ],
        "We may suspend or end access to the Services, without refund, if these rules are broken.",
      ],
    },
    {
      id: "ip",
      heading: "Intellectual property",
      blocks: [
        "All content on the website and in the Services, including lessons, worksheets, questions, videos, illustrations, logos and software, is owned by or licensed to us and is protected by copyright and other intellectual property laws.",
        "We give you a limited, personal, non-transferable licence to use this content for the student's own learning. You may not copy, distribute, resell, publish or create derivative works from it without our written permission.",
      ],
    },
    {
      id: "privacy",
      heading: "Privacy",
      blocks: [
        "We collect and use personal data about parents and students as described in our {privacy}. By using the Services, you confirm that you have read it and, as the parent or guardian, consent to us handling the student's personal data in that way.",
      ],
    },
    {
      id: "results",
      heading: "No guarantee of results",
      blocks: [
        "We are committed to high-quality teaching, but a student's progress depends on many factors, including effort, attendance and practice. We do not guarantee any particular exam result, grade or outcome.",
      ],
    },
    {
      id: "liability",
      heading: "Disclaimers and limitation of liability",
      blocks: [
        'The website and Services are provided on an "as is" and "as available" basis. We do not promise that they will be uninterrupted or error-free, and we are not responsible for interruptions caused by third-party services such as video conferencing, internet providers or payment gateways.',
        "To the fullest extent permitted by law, we are not liable for any indirect, incidental or consequential loss arising from your use of the Services. Our total liability to you for any claim is limited to the fees you paid to us in the three months before the event giving rise to the claim. Nothing in these Terms excludes liability that cannot be excluded by law.",
      ],
    },
    {
      id: "links",
      heading: "Third-party services and links",
      blocks: [
        "The website and Services may link to or depend on third-party services, such as Billplz, Zoom, Practicle, WhatsApp and Facebook. We do not control and are not responsible for their content, availability or practices, and your use of them is governed by their own terms.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to these Terms",
      blocks: [
        'We may update these Terms from time to time. When we do, we will change the "last updated" date at the top of this page and, for material changes, take reasonable steps to let you know. Continuing to use the Services after the changes take effect means you accept the updated Terms.',
      ],
    },
    {
      id: "law",
      heading: "Governing law",
      blocks: [
        "These Terms are governed by the laws of Malaysia. Any dispute arising from them or from the Services will be subject to the exclusive jurisdiction of the courts of Malaysia, unless applicable law gives you the right to bring a claim elsewhere.",
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      blocks: [
        "If you have any questions about these Terms, please contact us:",
        ["Email: {email}", "WhatsApp / phone: {phone}", "Address: {address}"],
      ],
    },
  ],
};

export const privacy: LegalContent = {
  title: "Privacy Policy",
  description:
    "How Singapore Math Wizard collects, uses, stores and protects parent and student information, including payments made through Billplz.",
  updated: "14 October 2026",
  intro: [
    "Singapore Math Wizard (**we**, **us**, **our**) respects your privacy and the privacy of your child. This Privacy Policy explains what personal data we collect when you use www.sgmathwizard.com and our online classes, how we use and protect it, and the choices you have.",
    "We handle personal data in accordance with the Personal Data Protection Act 2010 of Malaysia (**PDPA**). This policy should be read together with our {terms}.",
  ],
  sections: [
    {
      id: "collect",
      heading: "Information we collect",
      blocks: [
        "Depending on how you use our website and Services, we may collect the following.",
        [
          "**Parent or guardian details:** name, email address, phone or WhatsApp number, country, and billing information needed to issue receipts.",
          "**Student details:** name, age or primary school level, school (if provided), learning needs, and any information you choose to tell us about the student when you contact us or register.",
          "**Learning records:** class attendance, assessment results, homework and practice activity, progress on the Practicle platform, and teacher feedback.",
          "**Class recordings:** audio and video of online sessions, which may include the student's image and voice, where recording is used.",
          "**Payment information:** the plan purchased, amount, transaction reference and payment status returned by Billplz. We do not collect or store your full card number or online banking credentials.",
          "**Messages:** the content of enquiries sent through our contact form, WhatsApp, email or social media.",
          "**Technical data:** IP address, browser type, device information and pages visited, collected through cookies and similar technologies.",
        ],
      ],
    },
    {
      id: "children",
      heading: "Children's information",
      blocks: [
        "Our Services are used by children, but all registration, communication and payment is made by a parent or legal guardian. We collect a student's personal data only from, or with the consent of, their parent or guardian, and we use it only to teach and support the student.",
        "If you believe a child has given us personal data without a parent's or guardian's consent, please contact us and we will take steps to delete it.",
      ],
    },
    {
      id: "how",
      heading: "How we collect information",
      blocks: [
        [
          "directly from you when you fill in the contact form, register, book a trial or contact us;",
          "during classes, through homework, practice and assessments;",
          "from Billplz when you make a payment; and",
          "automatically through cookies and similar technologies when you browse the website.",
        ],
      ],
    },
    {
      id: "use",
      heading: "How we use your information",
      blocks: [
        [
          "to register students, match them with teachers and provide classes, practice and progress reports;",
          "to process payments, issue receipts and manage subscriptions;",
          "to communicate with you about schedules, replacement classes, billing, service updates and your enquiries;",
          "to monitor and improve the quality of our teaching, content and website;",
          "to keep our Services secure and prevent fraud or misuse;",
          "to comply with legal and regulatory obligations; and",
          "to send you information about our programmes, where you have agreed to receive it. You can opt out at any time.",
        ],
        "We do not sell your personal data or the student's personal data.",
      ],
    },
    {
      id: "payments",
      heading: "Payments and Billplz",
      blocks: [
        "Payments on our website are processed by {billplz}, a Malaysian payment gateway. When you pay, your payment details are entered on Billplz's secure payment page or with your bank, not on our website.",
        [
          "Billplz and your bank act as independent processors of your payment details and handle them under their own privacy policies and security standards.",
          "We receive only the information we need to confirm and record your payment, such as your name, contact details, the amount paid, the transaction reference and whether the payment succeeded.",
          "We keep payment records to meet our accounting, tax and audit obligations.",
        ],
      ],
    },
    {
      id: "share",
      heading: "Who we share information with",
      blocks: [
        "We share personal data only where it is needed to deliver the Services or where the law requires it:",
        [
          "**Our teachers and staff**, who see the information they need to teach and support the student;",
          "**Service providers** that help us run the Services, such as Billplz (payments), Zoom (video classes), the Practicle learning platform, website hosting and communication tools such as WhatsApp and email;",
          "**Professional advisers**, such as accountants and legal advisers, where necessary; and",
          "**Authorities and other parties** where we are required or permitted by law, or to protect our rights and the safety of students and others.",
        ],
        "We require service providers to protect personal data and to use it only for the purposes we have given them.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and similar technologies",
      blocks: [
        "Our website may use cookies and similar technologies to make the site work, remember your preferences, such as your chosen language, and understand how the site is used. You can control or delete cookies in your browser settings, although some parts of the website may not work properly if you block them.",
      ],
    },
    {
      id: "whatsapp",
      heading: "Contacting us through WhatsApp",
      blocks: [
        "Our contact form prepares your details as a WhatsApp message to our team. When you send it, or when you message us directly on WhatsApp, the message is handled by WhatsApp under its own terms and privacy policy. Please avoid sending sensitive information, such as bank details, over chat.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep information",
      blocks: [
        "We keep personal data only for as long as it is needed for the purposes described in this policy, including to provide the Services, resolve disputes and meet legal, accounting and tax requirements. When data is no longer needed, we delete it or anonymise it.",
        "Class recordings are kept for a limited period for teaching, quality and follow-up purposes and are then deleted.",
      ],
    },
    {
      id: "security",
      heading: "How we protect information",
      blocks: [
        "We use reasonable technical and organisational measures to protect personal data against loss, misuse, unauthorised access and disclosure, including access controls and encrypted connections (HTTPS). No method of transmission or storage is completely secure, so we cannot guarantee absolute security. Please keep your account details confidential.",
      ],
    },
    {
      id: "transfers",
      heading: "Transfers outside Malaysia",
      blocks: [
        "Some of our service providers, and parents and students themselves, may be located outside Malaysia, so personal data may be processed in other countries. Where this happens, we take reasonable steps to make sure it is protected in line with the PDPA.",
      ],
    },
    {
      id: "rights",
      heading: "Your rights",
      blocks: [
        "Under the PDPA, you have the right to:",
        [
          "ask for access to the personal data we hold about you or your child;",
          "ask us to correct personal data that is inaccurate, incomplete or out of date;",
          "withdraw your consent to our use of personal data, or limit how we use it, which may affect our ability to provide the Services; and",
          "opt out of marketing messages at any time.",
        ],
        "To make a request, email us at {email}. We may need to verify your identity first, and we will respond within the time required by law.",
      ],
    },
    {
      id: "links",
      heading: "Links to other websites",
      blocks: [
        "Our website may link to other websites and services, such as Facebook, WhatsApp, Practicle and Billplz. We are not responsible for their privacy practices, so please read their policies.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        'We may update this Privacy Policy from time to time. The "last updated" date at the top of this page shows when it was last changed. For material changes, we will take reasonable steps to let you know.',
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      blocks: [
        "If you have any questions or complaints about this policy, or how we handle personal data, please contact us:",
        ["Email: {email}", "WhatsApp / phone: {phone}", "Address: {address}"],
      ],
    },
  ],
};
