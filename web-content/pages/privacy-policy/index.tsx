import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useSessionStorage } from "@/hooks/useStorage";
import { IsAuthenticated, } from "@/services/authService";
import Head from "next/head";
import TermsNav from "@/components/TermsNav";

const TermsofEngage = () => {
  const [expressJoin, setExpressJoin] = useSessionStorage(
    "meetingJoiner",
    "yes"
  );
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const onboarding = React.useRef(null);
  const createSessionSection = React.useRef(null);
  const startingMeetingSection = React.useRef(null);
  const switchCameraSection = React.useRef(null);
  const actionSection = React.useRef(null);
  const respectSection = React.useRef(null);
  const emojiReactionSection = React.useRef(null);
  const accessingAccountSection = React.useRef(null);
  const signInSection = React.useRef(null);
  const settleSection = React.useRef(null);
  const signUpDection = React.useRef(null);
  const termsSection = React.useRef(null);
  const usingEmojiSection = React.useRef(null);
  const recordMeetingSection = React.useRef(null);
  const serviceSection = React.useRef(null);
  const abuseSection = React.useRef(null);
  const profileEditSection = React.useRef(null);
  const dataRetentionSection = React.useRef(null);
  const dataSecuritySection = React.useRef(null);
  const dataBreachSection = React.useRef(null);
  const dataTransfer = React.useRef(null);
  const dataProcessor = React.useRef(null);
  const dataCollectionSection = React.useRef(null);
  const dataProtection = React.useRef(null);
  const employeeRes = React.useRef(null);
  const userRes = React.useRef(null);
  const complianceSection = React.useRef(null);
  const regulatorySection = React.useRef(null);
  const incidentSection = React.useRef(null);
  const scrollDown = (ref: any) => {
    const offset = 106; // Adjust this value as needed
    const targetPosition =
      ref?.current.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setLoggedIn(IsAuthenticated());
  }, []);
  return (
    <>
      <Head>
        <title>CIL Privacy policy       </title>
        <meta name="description" content="Web video conferencing tool" />
      </Head>
      {
        loggedIn !== null &&
        <>
          <div className="pt-4">
            <Header />
          </div>
          <div>
            <section className=" md:pb-[177px] px-2">
            <h1 className="text-center mt-12 font-bold text-xl lg:text-5xl text-[#080808]">Privacy Policy</h1>
              <p className=" text-xl text-center my-4 leading-[26px] text-cs-purple-500 px-2 ">
                  Last Updated January, 2025
                </p>
              <TermsNav/>
              <div className="container mx-auto md:flex">

                <div className="md:w-[30%] hidden lg:block pl-6">
                  <div className="sticky top-[15%]">
                    <div className="h-[400px] overflow-y-auto px-[10px] ">
                      <div className="mb-6 text-cs-grey-700 md:w-full text-zin text-base  font-normal">
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(onboarding)}
                          >
                            1{" "}
                            <span className="ml-[5px]">Purpose</span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(signUpDection)}
                          >
                            2<span className="ml-[5px]">Scope</span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(signInSection)}
                          >
                            3{" "}
                            <span className="ml-[5px]">
                              Definitions
                            </span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(createSessionSection)}
                          >
                            4{" "}
                            <span className="ml-[5px]">
                              Policy Statements                            </span>
                          </div>
                          <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(createSessionSection)}
                            >
                              <span className="ml-[5px]">4.1 Data Collection and Minimization

                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(respectSection)}
                            >
                              <span className="ml-[5px]">4.2 Legal Bases for Processing


                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(abuseSection)}
                            >
                              <span className="ml-[5px]">4.3 Data Subject Rights
                              </span>
                            </div>

                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(dataRetentionSection)}
                            >
                              <span className="ml-[5px]">4.4 Data Retention and Disposal
                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(dataCollectionSection)}
                            >
                              <span className="ml-[5px]">4.5 Data Collection and Minimization
                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(dataBreachSection)}
                            >
                              <span className="ml-[5px]">4.6 Data Breach Management
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(dataTransfer)}
                            >
                              <span className="ml-[5px]">4.7 Cross-Border Data Transfers
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(dataProcessor)}
                            >
                              <span className="ml-[5px]">4.8 Third-Party Data Processors
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(serviceSection)}
                          >
                            5 <span className="ml-[5px]">Data Protection Impact Assessments (DPIA)

                            </span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(switchCameraSection)}
                          >
                            6 <span className="ml-[5px]">Employee and User Responsibilities

                            </span>
                          </div>
                          <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(employeeRes)}
                            >
                              <span className="ml-[5px]">6.1 Employee Responsibilities
                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(userRes)}
                            >
                              <span className="ml-[5px]">6.2 User Responsibilities
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(emojiReactionSection)}
                          >
                            7<span className="ml-[5px]">Monitoring and Auditing</span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(recordMeetingSection)}
                          >
                            8{" "}
                            <span className="ml-[5px]">
                              Data Privacy Training
                            </span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(profileEditSection)}
                          >
                            9{" "}
                            <span className="ml-[5px]">
                              Compliance and Governance
                            </span>
                          </div>
                          <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(dataProtection)}
                            >
                              <span className="ml-[5px]">9.1 Data Protection Officer (DPO)
                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(complianceSection)}
                            >
                              <span className="ml-[5px]">9.2 Compliance with Standards
                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(regulatorySection)}
                            >
                              <span className="ml-[5px]">9.3 Regulatory Updates
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(incidentSection)}
                            >
                              <span className="ml-[5px]">9.4 Incident Management
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(actionSection)}
                          >
                            10{" "}
                            <span className="ml-[5px]">
                              Policy Review and Updates                            </span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(settleSection)}
                          >
                            11{" "}
                            <span className="ml-[5px]">
                              Contact Information</span>                          </div>

                        </div>  <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(termsSection)}
                          >
                            12{" "}
                            <span className="ml-[5px]">
                              References                       </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[65%] w-full lg:ml-[79px]  lg:mt-0 mb-[60px] lg:mb-0 lg:mx-20">
             
                  <div className="mt-[40px]">
                    <div className=" ">
                      <div>
                        <span
                          className="text-cs-grey-800 text-xl font-bold"
                          ref={onboarding}
                        >
                          1.<span className="ml-[5px] font-bold">Purpose
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-[15px] ml-6">

                      <p className="ml-[8px] mb-2 text-cs-gre text-base font-light font-lota leading-relaxed">
                        This policy outlines how the organisation collects, processes, stores, and protects
                        personal data. It ensures compliance with global privacy laws and standards,
                        safeguarding the rights of individuals and addressing all conceivable security and
                        privacy risks.
                      </p>


                    </div>
                  </div>

                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={signUpDection}>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          2
                          <span className="ml-[5px]  font-bold">Scope</span>
                        </span>
                      </div>

                    </div>

                    <div className="mt-[15px] ml-6">

                      <p className="ml-[8px] mb-2 text-cs-gre text-base font-light font-lota leading-relaxed">This policy applies to: </p>
                      <ul className="pl-[5px] lg:pl-[44px] mb-4">
                        <li className="mb-3 list-disc leading-5 ">All employees, contractors, vendors, and third parties handle personal data
                          on behalf of the organisation.

                        </li>
                        <li className="mb-3 list-disc leading-5">All personal data processed by the organisation, regardless of format
                          (physical, electronic) or origin.

                        </li>
                        <li className=" list-disc leading-5 mb-3">All organisational systems, applications, and platforms involved in data
                          collection, processing, or storage.
                        </li>

                      </ul>
                    </div>


                  </div>

                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={signInSection}>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          3
                          <span className="ml-[5px]  font-bold">
                            Definitions                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={accessingAccountSection}>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 "> <span className="font-bold">Personal Data:</span>  Any information relating to an identified or identifiable
                            natural person.

                          </li>
                          <li className="mb-3 list-disc leading-5"><span className="font-bold">Sensitive Personal Data:</span> Data requiring enhanced protection, such as health
                            information, financial data, or biometric identifiers.
                          </li>
                          <li className=" list-disc leading-5 mb-3"><span className="font-bold">Data Subject:</span> An individual whose personal data is collected or processed.
                          </li>
                          <li className=" list-disc leading-5 mb-3"><span className="font-bold">Data Controller:</span> The entity determining the purpose and means of
                            processing personal data.
                          </li>
                          <li className=" list-disc leading-5 mb-3"><span className="font-bold">Data Processor:</span> The entity processing personal data on behalf of the
                            controller.
                          </li>
                          <li className=" list-disc leading-5 mb-3"><span className="font-bold">Anonymisation:</span> Irreversibly removing identifiable elements from data.
                          </li>
                          <li className=" list-disc leading-5 mb-3"><span className="font-bold">Pseudonymisation:</span> Replacing identifiable elements in data with placeholders
                            to reduce identification risk.</li>
                        </ul>

                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={createSessionSection}>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          4
                          <span className="ml-[5px] ">
                            Policy Statements                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={startingMeetingSection}>
                        <p className="ml-[5px] font-semibold mb-4">
                         4.1 Data Collection and Minimization
                        </p>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            Personal data is collected only for legitimate, specific, and lawful purposes.
                          </li>
                          <li className="mb-3 list-disc leading-5">
                            Data collection is minimised to what is strictly necessary for the stated
                            purposes.                          </li>
                          <li className=" list-disc leading-5 mb-3">Consent is obtained before collecting personal data, except where other legal
bases apply (e.g., contract, legal obligation).
                          </li>
                        </ul>
                      </div>
                      <div className="mt-[15px] ml-6" ref={respectSection}>
                        <p className="ml-[5px] font-semibold mb-4">
                        4.2 Legal Bases for Processing                       </p>
                        <p className="ml-[8px] mb-2 text-cs-gre text-base font-light font-lota leading-relaxed">
                          Personal data is processed only under one of the following conditions:</p>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            Explicit consent from the data subject.
                          </li>
                          <li className="mb-3 list-disc leading-5">
                            Fulfillment of a contractual obligation.
                          </li>
                          <li className=" list-disc leading-5 mb-3">
                            Compliance with legal obligations.  </li>
                          <li className=" list-disc leading-5 mb-3">
                            Legitimate interests pursued by the organisation or a third party, provided
                            they do not override data subject rights. </li> <li className=" list-disc leading-5 mb-3">
                            Protection of vital interests of the data subject.  </li>
                        </ul>
                      </div>
                      <div className="mt-[15px] ml-6" ref={abuseSection}>
                        <p className="ml-[5px] font-semibold mb-4">
                        4.3  Data Subject Rights              </p>
                        <p className="ml-[8px] mb-2 text-cs-gre text-base font-light font-lota leading-relaxed">
                          The organisation upholds the following rights of data subjects:</p>

                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 "> <span className="font-bold">Access:</span>  Individuals can request access to their data.
                            natural person.

                          </li>
                          <li className="mb-3 list-disc leading-5"><span className="font-bold">Rectification:</span> Inaccurate data will be corrected promptly.
                            information, financial data, or biometric identifiers.
                          </li>
                          <li className=" list-disc leading-5 mb-3"><span className="font-bold">Erasure (&quot;Right to be Forgotten&quot;):</span> Data will be deleted upon valid request
                            unless legal retention requirements apply.
                          </li>
                          <li className=" list-disc leading-5 mb-3"><span className="font-bold">Restriction of Processing:</span> Data subjects can request restricted processing
                            under specific conditions.
                          </li>
                          <li className=" list-disc leading-5 mb-3"><span className="font-bold">Data Portability:</span>Individuals can request a copy of their data in a
                            machine-readable format.
                          </li>
                          <li className=" list-disc leading-5 mb-3"><span className="font-bold">Objection:</span> Data subjects can object to data processing for direct marketing
                            or other purposes.
                          </li>
                          <li className=" list-disc leading-5 mb-3"><span className="font-bold">Automated Decision-Making:</span> Individuals have the right not to be subjected
                            to decisions based solely on automated processing.
                          </li>
                        </ul>

                      </div>
                      <div className="mt-[15px] ml-6" ref={dataRetentionSection}>
                        <p className="ml-[5px] font-semibold mb-4">
                        4.4 Data Retention and Disposal
                        </p>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            Personal data is retained only as long as necessary for the purpose it was
                            collected. </li>
                          <li className="mb-3 list-disc leading-5">
                           Data is securely disposed of when no longer required, following the Data
                            Retention Policy and regulatory requirements.                          </li>

                        </ul>
                      </div>
 <div className="mt-[15px] ml-6" ref={dataCollectionSection}>
                        <p className="ml-[5px] font-semibold mb-4">
                        4.5 Data Collection and Minimization
                        </p>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            Personal data is collected only for legitimate, specific, and lawful purposes.
                          </li>
                          <li className="mb-3 list-disc leading-5">
                            Data collection is minimised to what is strictly necessary for the stated
                            purposes.                          </li>
                          <li className=" list-disc leading-5 mb-3">Data collection is minimised to what is strictly necessary for the stated
                            purposes.
                          </li>
                        </ul>
                      </div> 
                      <div className="mt-[15px] ml-6" ref={dataBreachSection}>
                        <p className="ml-[5px] font-semibold mb-4">
                        4.6  Data Breach Management                        </p>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            All data breaches are reported to the Data Protection Officer (DPO) within <span className="font-bold">24
                              hours</span>  of discovery.                          </li>
                          <li className="mb-3 list-disc leading-5">
                            Breaches involving personal data are reported to relevant regulatory
                            authorities and affected individuals within <span className="font-bold">72 hours</span> if required by law.                         </li>
                          <li className=" list-disc leading-5 mb-3">A root cause analysis and corrective actions are documented for all breaches.
                          </li>
                        </ul>
                      </div>
                      <div className="mt-[15px] ml-6" ref={dataTransfer}>
                        <p className="ml-[5px] font-semibold mb-4">
                        4.7 Cross-Border Data Transfers                        </p>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            Personal data transfers outside the organisation’s operational jurisdiction
                            comply with applicable laws, including GDPR’s requirements for adequate
                            safeguards (e.g., Standard Contractual Clauses and binding Corporate Rules).                          </li>
                          <li className="mb-3 list-disc leading-5">
                            A Data Transfer Impact Assessment (DTIA) is performed before initiating
                            cross-border data transfers.                       </li>

                        </ul>
                      </div>
                      <div className="mt-[15px] ml-6" ref={dataProcessor}>
                        <p className="ml-[5px] font-semibold mb-4">
                        4.8 Third-Party Data Processors                      </p>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            Third-party processors handling personal data must sign Data Processing
                            Agreements (DPAs) outlining their obligations under privacy laws.                        </li>
                          <li className="mb-3 list-disc leading-5">
                            Processors are subject to periodic audits to ensure compliance with security
                            and privacy standards.                    </li>
                          <li className="mb-3 list-disc leading-5">
                            Personal data sharing with third parties is minimized and based on
                            documented necessity.                    </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={serviceSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl  font-bold">
                          5
                          <span className="ml-[5px]  font-bold">Data Protection Impact Assessments (DPIA) </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6">
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            DPIAs are conducted for high-risk processing activities, including:
                            <ul className="pl-[5px] lg:pl-[44px] my-4">
                              <li className="mb-3 list-disc leading-5 ">
                                Large-scale processing of sensitive data.  </li>
                              <li className="mb-3 list-disc leading-5">
                                Use of new technologies that impact personal data.                   </li>
                              <li className="mb-3 list-disc leading-5">
                                Systematic monitoring or profiling.                    </li>
                            </ul>
                          </li>
                          <li className="mb-3 list-disc leading-5">
                            DPIAs document processing risks and mitigation measures, ensuring legal
                            and ethical compliance.                  </li>

                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={switchCameraSection}>
                      <div>
                        <span className="text-cs-gre text-xl  font-bold">
                          6
                          <span className="ml-[5px]  font-bold">Employee and User Responsibilities
                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={employeeRes}>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-bold font-lota leading-relaxed">
                         6.1 Employee Responsibilities      </p>

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Employees handling personal data must:
                            <ul className="pl-[12px] lg:pl-[44px] mb-4">
                              <li className=" list-disc leading-5 my-3">Follow this policy and complete annual privacy training.
                              </li>
                              <li className=" list-disc leading-5 my-3">Report potential data breaches or policy violations immediately.
                              </li>
                              <li className=" list-disc leading-5 my-3">Avoid storing personal data on unapproved devices or platforms.
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-[15px] ml-6" ref={userRes}>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-bold font-lota leading-relaxed">
                      6.2  User Responsibilities     </p>

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Users providing personal data must ensure its accuracy and notify the
                          organisation of changes to their data
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={emojiReactionSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          7
                          <span className="ml-[5px]  font-bold">Monitoring and Auditing</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={usingEmojiSection}>
                       
                      <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Data processing activities are logged and reviewed periodically to ensure
                          compliance.
                          </li>
                          <li className=" list-disc leading-5 my-3">Annual internal and external audits verify adherence to privacy laws and this
                          policy.
                          </li>
                          <li className=" list-disc leading-5 my-3">Monitoring tools are deployed to detect unauthorised data access,
                          modification, or misuse.
                          </li>
                        </ul>

                      </div>

                    </div>
                  </div>

                  <div className="mt-[40px]">
                    <div className=" " ref={recordMeetingSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          8
                          <span className="ml-[5px]  font-bold">
                          Data Privacy Training                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={usingEmojiSection}>
                       
                       <ul className="pl-[12px] lg:pl-[44px] mb-4">
                           <li className=" list-disc leading-5 my-3">All employees must complete mandatory privacy and security training upon
                           joining and annually thereafter.
                           </li>
                           <li className=" list-disc leading-5 my-3">Specialised training is provided for roles handling sensitive data, such as HR,
                           IT, and legal departments.
                           </li>
                         
                         </ul>
 
                       </div>
                    </div>
                  </div>

                  <div className="mt-[40px]">
                    <div className=" " ref={profileEditSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          9
                          <span className="ml-[5px]">
                          Compliance and Governance                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={dataProtection}>
                        <p className="text-cs-grey-800 ml-[5px] mb-4 text-base font-semibold font-lotar leading-relaxed">
                       9.1 Data Protection Officer (DPO)
                        </p>
                    
                        <ul className="mb-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc">
                          The DPO oversees the implementation of this policy, conducts audits, and
                          serves as the point of contact for regulatory authorities and data subjects.
                          </li>
                          <li className="mb-3 list-disc">The DPO ensures that privacy practices evolve with regulatory updates and
                          emerging threats.
                          </li>
                        </ul>
                      
                      </div>
                      <div className="mt-[15px] ml-6" ref={complianceSection}>
                        <p className="text-cs-grey-800 ml-[5px] mb-4 text-base font-semibold font-lotar leading-relaxed">
                      9.2  Compliance with Standards                    </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        This policy complies with:
                        </p>
                        
                        <ul className="mb-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc leading-5 font-bold">
                            The Nigeria Data Protection Act
                          </li>
                          <li className="mb-3 list-disc leading-5 font-bold">
                          General Data Protection Regulation (GDPR)
                          </li>
                          <li className="mb-2 list-disc leading-5">
                        <span className="font-bold"> ISO/IEC 27701: </span> Privacy Information Management System                          </li>
                          <li className="mb-2 list-disc leading-5">
                          <span className="font-bold">ISO/IEC 27001:</span>    Information Security Management System    </li>
                        
                        </ul>
                      </div>
                      <div className="mt-[15px] ml-6" ref={regulatorySection}>
                        <p className="text-cs-grey-800 ml-[5px] mb-4 text-base font-semibold font-lotar leading-relaxed">
                        9.3 Regulatory Updates
                        </p>
                    
                        <ul className="mb-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc">
                          The policy is reviewed bi-annually or when major regulatory changes occur.</li>
                          <li className="mb-3 list-disc">Changes to the policy are communicated organisation-wide, and employees
                          must acknowledge updates.
                          </li>
                        </ul>
                      
                      </div>
                      <div className="mt-[15px] ml-6" ref={incidentSection}>
                        <p className="text-cs-grey-800 ml-[5px] mb-4 text-base font-semibold font-lotar leading-relaxed">
                        9.4 Incident Management
                        </p>
                    
                        <ul className="mb-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc">
                          Incident Response Plans include procedures for:
                          <ul className="my-2 pl-5 lg:pl-[44px]">
                            <li className="mb-3 list-disc">Identifying and containing breaches involving personal data.</li>
                            <li className="mb-3 list-disc">Notifying affected data subjects and authorities as required by law.</li>
                            <li className="mb-3 list-disc">Implementing corrective actions and preventing recurrence.</li>
                            </ul>
                            </li>
                        </ul>

                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={actionSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          10
                          <span className="ml-[5px]">
                          Policy Review and Updates                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={actionSection}>
                        <ul className="mb-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc">This policy is reviewed annually or when significant regulatory, technological,
                          or business changes occur.
                          </li>
                          <li className="mb-3 list-disc">Feedback from audits, incidents, and employee inputs are incorporated into
                          revisions.   </li>
                        </ul>

                      </div>
                   
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={settleSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          11
                          <span className="ml-[5px] ">
                          Contact Information
                          </span>
                          </span>

                      </div>
                      <div className="mt-[15px] ml-6" ref={settleSection}>
                           <p className="ml-[8px] mb-2 text-cs-gre text-base font-light font-lota leading-relaxed">
                       All requests or concerns pertaining to user data on this platform should please be sent to any of the below:
                      </p>
                        <ul className="mb-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-decimal"> Security Team - <a href="mailto:mdr@cil.support" className="font-bold">mdr@cil.support</a>   
                          </li>
                          <li className="mb-3 list-decimal">Data Custodian
                          <ul className="my-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc">Operational Controls for Internal and Customer Data - <span className="font-bold">Head of Engineering</span> 
                          </li>
                        </ul>
                          </li>
                          <li className="mb-3 list-decimal "> IT Helpdesk
                          <ul className="my-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc">
                          For technical support - <a href="mailto:helpdesk@cil.support" className="font-bold">CIL Helpdesk</a>   </li>
                        </ul>
                          </li>
                        </ul>

                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={termsSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          12
                          <span className="ml-[5px] ">
                          References
                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={termsSection}>
                      <ul className="mb-2 pl-5 lg:pl-[44px]">
                      <li className="mb-3 list-decimal">   
                            <a href="https://ndpc.gov.ng/resources/#flipbook-df_2442/1/" target="_blank" className="font-bold text-cs-purple-500 underline "> Nigeria Data Protection Act </a>   
                          </li>
                          <li className="mb-3 list-decimal"> <span className="font-bold">ISO/IEC 27001

2022 –</span>  Information Security Management Systems

Requirements: <a href="https://www.iso.org/obp/ui/en/#iso:std:iso-iec:27001:ed-3:v1:en" target="_blank" className="font-bold text-cs-purple-500 underline"> ISO 27001
2022 </a>   
                          </li>
                          <li className="mb-3 list-decimal"><span className="font-bold">GDPR</span> – General Data Protection Regulation:
                          <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679" target="_blank" className="font-bold text-cs-purple-500 underline"> GDPR </a>   
                          </li>
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>
                </div>
              </div>
            </section>
          </div>
        </>
      }
    </>
  );
}
export default TermsofEngage