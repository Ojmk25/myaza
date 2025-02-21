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
  const switchCameraSection = React.useRef(null);
  const emojiReactionSection = React.useRef(null);
  const accessingAccountSection = React.useRef(null);
  const signInSection = React.useRef(null);
  const settleSection = React.useRef(null);
  const signUpDection = React.useRef(null);
  const termsSection = React.useRef(null);
  const usingEmojiSection = React.useRef(null);
  const recordMeetingSection = React.useRef(null);
  const serviceSection = React.useRef(null);
  const profileEditSection = React.useRef(null);
  const dataProtection = React.useRef(null);
  const remoteAccess = React.useRef(null);
  const internetUsage = React.useRef(null);
  const softwareLicense = React.useRef(null);
  const passwordManagement = React.useRef(null);
  const monitoringPrivacy = React.useRef(null);
  const reportingSecurity =  React.useRef(null);
  const disciplinaryActions = React.useRef(null);
  const legalCompliance  = React.useRef(null);
  const reviewUpdate  = React.useRef(null);
  const trainingAwareness  = React.useRef(null);

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
        <title>CIL Acceptance policy       </title>
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
            <h1 className="text-center mt-4 font-bold text-xl lg:text-5xl text-[#080808]">Acceptance Use Policy</h1>
              <p className=" text-xl text-center my-4 leading-[26px] text-cs-purple-500 px-2 ">
                  Last Updated January, 2025
                </p>
              <TermsNav/>
              <div className="container mx-auto md:flex">

                <div className="md:w-[30%] hidden lg:block pl-6">
                  <div className="sticky top-[15%]">
                    <div className="h-[400px] overflow-y-auto px-[10px] ">
                      <div className="mb-6 text-cs-grey-700 md:w-full text-base  font-normal">
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
                              Policy Overview
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
                              Authorised Access and Use                           </span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(serviceSection)}
                          >
                            5 <span className="ml-[5px]">General Acceptable Use

                            </span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(switchCameraSection)}
                          >
                            6 <span className="ml-[5px]">Prohibited Activities
                            </span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(emojiReactionSection)}
                          >
                            7<span className="ml-[5px]">Data Protection and Confidentiality</span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(recordMeetingSection)}
                          >
                            8{" "}
                            <span className="ml-[5px]">
                              Email and Communication Use
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
                              Network Security                            </span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(remoteAccess)}
                          >
                            10{" "}
                            <span className="ml-[5px]">
                              Remote Access and Mobile Device Usage                         </span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(internetUsage)}
                          >
                            11{" "}
                            <span className="ml-[5px]">
                              Internet Usage</span>                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(softwareLicense)}
                          >
                            12{" "}
                            <span className="ml-[5px]">
                              Software and Licensing                      </span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(passwordManagement)}
                          >
                            13{" "}
                            <span className="ml-[5px]">
                              Password Management and Authentication                      </span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(monitoringPrivacy)}
                          >
                            14{" "}
                            <span className="ml-[5px]">
                              Monitoring and Privacy                    </span>
                          </div>
                        </div>  <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(reportingSecurity)}
                          >
                            15{" "}
                            <span className="ml-[5px]">
                              Reporting and Security Incident                   </span>
                          </div>
                        </div>  <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(disciplinaryActions)}
                          >
                            16{" "}
                            <span className="ml-[5px]">
                            Disciplinary Actions</span>
                          </div>
                        </div>  <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(legalCompliance)}
                          >
                            17{" "}
                            <span className="ml-[5px]">
                            Legal and Regulatory Compliance                      </span>
                          </div>
                        </div>  <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(reviewUpdate)}
                          >
                            18{" "}
                            <span className="ml-[5px]">
                              Review and Updates                     </span>
                          </div>
                        </div>  <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(trainingAwareness)}
                          >
                            19{" "}
                            <span className="ml-[5px]">
                              Training and Awareness   </span>                       </div>
                        </div>  <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(settleSection)}
                          >
                            20{" "}
                            <span className="ml-[5px]">
                              Contact Information                     </span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(termsSection)}
                          >
                            21{" "}
                            <span className="ml-[5px]">
                              Reference                      </span>
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
                          className="text-zinc-900 text-xl font-bold"
                          ref={onboarding}
                        >
                          1.<span className="ml-[5px] font-bold">Purpose
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-[15px] ml-6">

                      <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        This policy aims to ensure that all users of Cecure Intelligence Limited (CIL) IT
                        resources use these assets responsibly, ethically, and legally. By establishing clear
                        rules for acceptable use, CIL seeks to protect its information systems, maintain data
                        security, and support employee productivity while adhering to industry standards
                        like ISO 27001

                        2022, NIST, and GDPR for regulatory compliance.
                      </p>


                    </div>
                  </div>

                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={signUpDection}>
                        <span className="text-zinc-900 text-xl font-bold">
                          2
                          <span className="ml-[5px]  font-bold">Scope</span>
                        </span>
                      </div>

                    </div>

                    <div className="mt-[15px] ml-6">

                      <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">This policy applies to all employees, contractors, consultants, temporary workers,
                        and other individuals with access to CIL IT resources, including systems, data,
                        network infrastructure, and technology assets. It covers both company-owned and
                        personal devices (BYOD) used to access CIL resources. </p>

                    </div>


                  </div>

                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={signInSection}>
                        <span className="text-zinc-900 text-xl font-bold">
                          3
                          <span className="ml-[5px]  font-bold">
                            Policy Overview                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={accessingAccountSection}>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                          CIL IT resources are provided to support business activities, facilitate professional
                          productivity, and ensure secure, efficient business operations. Users are expected
                          to use CIL’s IT resources in a lawful, ethical, and professional manner, strictly in
                          alignment with CIL’s business interests and regulatory obligations. Users must also
                          report violations and understand how misuse impacts overall security.
                        </p>

                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={createSessionSection}>
                        <span className="text-zinc-900 text-xl font-bold">
                          4
                          <span className="ml-[5px] ">
                            Authorised Access and Use                   </span>     </span>
                      </div>
                      <div className="mt-[15px] ml-6">

                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            Access to CIL’s IT resources is restricted to authorised users only and
                            must align with the user’s specific role and responsibilities. Access
                            privileges are reviewed periodically to ensure they remain appropriate for
                            the user’s job role.                          </li>
                          <li className="mb-3 list-disc leading-5">
                            Users may only access data, systems, and applications required for their
                            duties. Unnecessary or unauthorised access, modification, or deletion of
                            CIL data or IT resources is prohibited.                         </li>

                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={serviceSection}>
                      <div>
                        <span className="text-zinc-900 text-xl  font-bold">
                          5
                          <span className="ml-[5px]  font-bold">General Acceptable Use </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6">
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            Users may use CIL’s IT resources solely for business purposes. Personal
                            use must be minimal, limited to break times, and must not interfere with
                            work, network performance, or security.
                          </li>
                          <li className="mb-3 list-disc leading-5">
                            Users are prohibited from engaging in activities that disrupt or degrade
                            CIL’s IT systems, including excessive network usage, resource-intensive
                            applications, or unauthorised software installations.
                          </li>
                          <li className="mb-3 list-disc leading-5">
                            All activities must comply with internal policies and applicable laws and
                            regulations, including GDPR and relevant cybersecurity laws.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={switchCameraSection}>
                      <div>
                        <span className="text-zinc-900 text-xl  font-bold">
                          6
                          <span className="ml-[5px]  font-bold">Prohibited Activities
                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" >
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-bold font-lota leading-relaxed">
                          Users are prohibited from:    </p>

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Engaging in unauthorised sharing, copying, or distribution of proprietary,
                            internal, or confidential information.
                          </li>
                          <li className=" list-disc leading-5 my-3">Downloading, installing, or using unapproved software, including
                            unauthorised third-party applications and plugins.
                          </li>
                          <li className=" list-disc leading-5 my-3">Accessing or distributing offensive, discriminatory, or illegal content,
                            including content that is sexually explicit, violent, or promotes hate.
                          </li>
                          <li className=" list-disc leading-5 my-3">Engaging in any form of cyberattack or malicious activity, including
                            phishing, hacking, unauthorised scanning, or denial of service.
                          </li>
                          <li className=" list-disc leading-5 my-3">Using CIL systems for non-work-related commercial activities.
                          </li>
                          <li className=" list-disc leading-5 my-3">Misusing social media to share proprietary or confidential information.
                          </li>
                        </ul>
                      </div>

                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={emojiReactionSection}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          7
                          <span className="ml-[5px]  font-bold">Data Protection and Confidentiality</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={usingEmojiSection}>

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Users must handle sensitive and confidential information in compliance
                            with CIL’s data protection policies and data classification guidelines (e.g.,
                            public, internal, confidential, restricted).
                          </li>
                          <li className=" list-disc leading-5 my-3">
                            Personal data handling must align with GDPR, ensuring data minimization,
                            lawful processing, and respect for data subject rights.
                          </li>
                          <li className=" list-disc leading-5 my-3">
                          Users are prohibited from transferring or disclosing confidential
                          information to unauthorised individuals, both inside and outside of CIL.
                              </li>
                          <li className=" list-disc leading-5 my-3">
                            Access to personal or sensitive data must be limited to authorised
                            personnel with a justifiable business purpose and must comply with data
                            retention policies, ensuring secure deletion of data when no longer
                            needed. </li>
                        </ul>

                      </div>

                    </div>
                  </div>

                  <div className="mt-[40px]">
                    <div className=" " ref={recordMeetingSection}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          8
                          <span className="ml-[5px]  font-bold">
                            Email and Communication Use                         </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={usingEmojiSection}>

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Users should exercise caution when sending business-related emails or
                            messages, ensuring the accuracy, professionalism, and confidentiality of
                            all communications.
                          </li>
                          <li className=" list-disc leading-5 my-3">Prohibited email usage includes:

                            <ul className="pl-[12px] lg:pl-[44px] my-4">
                              <li className=" list-disc leading-5 my-3">
                                Sending spam, phishing, or unsolicited messages.
                              </li>
                              <li className=" list-disc leading-5 my-3">Transmitting sensitive information without appropriate security
                                measures, such as encryption.       </li>
                              <li className=" list-disc leading-5 my-3">Representing personal opinions as those of CIL.
                              </li>
                            </ul>
                          </li>
                          <li className=" list-disc leading-5 my-3">Secure, encrypted channels must be used for transmitting any sensitive or
                            confidential information.
                          </li>
                        </ul>

                      </div>
                    </div>
                  </div>

                  <div className="mt-[40px]">
                    <div className=" " ref={profileEditSection}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          9
                          <span className="ml-[5px]">
                            Network Security
                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={dataProtection}>
                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">All access to CIL’s network and information systems must be through
                            secure, authorised methods, including VPNs for remote access.
                          </li>
                          <li className=" list-disc leading-5 my-3">Users must not:

                            <ul className="pl-[12px] lg:pl-[44px] my-4">
                              <li className=" list-disc leading-5 my-3">
                                Use non-secure methods to access CIL networks. </li>
                              <li className=" list-disc leading-5 my-3">Introduce potentially harmful devices (e.g., USB drives) or software
                                that may compromise security.       </li>
                              <li className=" list-disc leading-5 my-3">Connect personal devices to CIL’s network without prior
                                authorization.                           </li>
                            </ul>
                          </li>
                          <li className=" list-disc leading-5 my-3">Network segmentation practices are in place to restrict access, and users
                            must adhere to their assigned network access rights.</li>
                          <li className=" list-disc leading-5 my-3">Users must report any suspicious or unauthorised access attempts
                            immediately to the IT security team.</li>

                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={remoteAccess} >
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          10
                          <span className="ml-[5px]  font-bold">Remote Access and Mobile Device Usage</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" >

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Users must follow CIL’s remote access protocols when accessing company
                            resources from external locations.
                          </li>
                          <li className=" list-disc leading-5 my-3">
                            Mobile devices with access to CIL’s network or data must have approved
                            security configurations, including password protection, encryption, and
                            multi-factor authentication (MFA), if applicable.</li>
                          <li className=" list-disc leading-5 my-3">
                            Lost or stolen devices with access to CIL data must be reported
                            immediately to the IT security team. </li>
                        </ul>

                      </div>

                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={internetUsage}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          11
                          <span className="ml-[5px]  font-bold">Internet Usage</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" >

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Internet access provided by CIL must be used responsibly and primarily
                          for work-related purposes.
                          </li>
                          <li className=" list-disc leading-5 my-3">
                          Users should avoid visiting unauthorised, risky, or non-business-related
                          websites that may compromise CIL’s security.
                          </li>
                          <li className=" list-disc leading-5 my-3">
                          Web filtering and monitoring may be used to restrict access to
                          non-work-related or high-risk websites. </li>
                          <li className=" list-disc leading-5 my-3">
                          Downloading large files unrelated to business use is prohibited to prevent
                          unnecessary consumption of network bandwidth. </li>
                        </ul>

                      </div>

                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={softwareLicense}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          12
                          <span className="ml-[5px]  font-bold">Software and Licensing</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" >

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">
                          All software installed on CIL devices or used for CIL purposes must be
properly licensed, obtained from approved sources, and authorised by IT
management.
                          </li>
                          <li className=" list-disc leading-5 my-3">
                          Users must not attempt to alter or bypass software licence agreements,
digital rights management (DRM) controls, or security settings on CIL
systems.
                             </li>
                          <li className=" list-disc leading-5 my-3">
                          Software installations are monitored to prevent unauthorised software
                          use.  </li>
                         
                        </ul>

                      </div>

                    </div>
                  </div><div className="mt-[40px]">
                    <div className=" " ref={passwordManagement}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          13
                          <span className="ml-[5px]  font-bold">Password Management and Authentication</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" >

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Users must follow CIL’s password policies, including the use of complex
passwords and periodic password changes. For detailed requirements,
refer to the CIL Identity and Access Management Policy .
                          </li>
                          <li className=" list-disc leading-5 my-3">
                          Users must not share passwords or authentication credentials with
                          others, including colleagues, friends, or family members.
                           </li>
                          <li className=" list-disc leading-5 my-3">MFA must be enabled for sensitive applications and systems, beyond
                          where it is strictly required.
                              </li>
                        </ul>

                      </div>

                    </div>
                  </div><div className="mt-[40px]">
                    <div className=" " ref={monitoringPrivacy} >
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          14
                          <span className="ml-[5px]  font-bold">Monitoring and Privacy</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" >

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">
                          CIL reserves the right to monitor all IT systems to ensure compliance with
                          this policy and detect unauthorised or malicious activities. </li>
                          <li className=" list-disc leading-5 my-3">Users should have no expectation of privacy when using CIL’s IT
resources, as all activities may be subject to logging, review, or auditing by
authorised personnel.
                           </li>
                          <li className=" list-disc leading-5 my-3">Any data created, stored, or transmitted using CIL resources is considered
                          company property and may be reviewed at any time.
                              </li>
                          <li className=" list-disc leading-5 my-3">Employees must provide consent to monitoring in line with legal and
regulatory obligations, and audit trails will be maintained to monitor
access to critical systems and data.
                            </li>
                        </ul>

                      </div>

                    </div>
                  </div><div className="mt-[40px]">
                    <div className=" " ref={reportingSecurity}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          15
                          <span className="ml-[5px]  font-bold">Reporting and Security Incident</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" >

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Users must report any security incident, suspected breach, or policy
violation immediately to CIL’s IT security team. Please refer to the
CIL Computer Security Incident Response Policy for further guidance.
                          </li>
                          <li className=" list-disc leading-5 my-3">Incident reports should include details about the issue, any affected
                          systems, and any actions taken to mitigate the risk.
                           </li>
                          <li className=" list-disc leading-5 my-3">Examples of reportable incidents include data breaches, lost or stolen
                          devices, password leaks, and unauthorised access attempts.
                              </li>
                        
                        </ul>

                      </div>

                    </div>
                  </div><div className="mt-[40px]">
                    <div className=" " ref={disciplinaryActions}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          16
                          <span className="ml-[5px]  font-bold">Disciplinary Actions</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" >

                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                          <li className=" list-disc leading-5 my-3">Violations of this policy may lead to disciplinary action, which could
                          include warnings, suspension, termination of employment, or legal action.
                          </li>
                          <li className=" list-disc leading-5 my-3">Progressive disciplinary measures will be applied based on the severity
and recurrence of offences, with serious breaches (e.g., unauthorised
access, data theft, malicious activities) referred to legal authorities for
prosecution.
                           </li>
                        
                        </ul>

                      </div>

                    </div>
                  </div><div className="mt-[40px]">
                    <div className=" "ref={legalCompliance} >
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          17
                          <span className="ml-[5px]  font-bold">Legal and Regulatory Compliance</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" >                    
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">The Acceptable Use Policy (AUP) is committed to adhering to all applicable industry
regulations, such as GDPR, HIPAA, and PCI DSS, as well as local laws. This means
that users are expected to comply with these regulations when using the services
provided, ensuring data privacy, security, and ethical use. By following this policy,
users contribute to maintaining a secure and compliant digital environment.</p>
                      </div>

                    </div>
                  </div><div className="mt-[40px]">
                    <div className=" " ref={reviewUpdate}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          18
                          <span className="ml-[5px]  font-bold">Review and Updates</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" > 
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">This AUP is subject to periodic review, at least annually, and may be updated in
response to evolving security requirements, regulatory changes, or business needs.
Users will be notified of significant changes, and continued use of CIL’s resources
constitutes acceptance of the most current version. Employees are required to
acknowledge the policy annually or upon any major update, indicating their
understanding and agreement to comply.</p>
                      </div>

                    </div>
                  </div><div className="mt-[40px]">
                    <div className=" " ref={trainingAwareness}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          19
                          <span className="ml-[5px]  font-bold">Training and Awareness</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" >

                      <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">All users must participate in regular security awareness and training programs to
ensure they are familiar with the AUP, data protection principles, and cybersecurity
best practices.</p>

                      </div>

                    </div>
                  </div>
                
                  <div className="mt-[40px]">
                    <div className=" " ref={settleSection}>
                      <div>
                        <span className="text-zinc-900 text-xl font-bold">
                          20
                          <span className="ml-[5px] ">
                            Contact Information
                          </span>
                        </span>

                      </div>
                      <div className="mt-[15px] ml-6" ref={settleSection}>
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
                          <span className="text-zinc-900 text-xl font-bold">
                            21
                            <span className="ml-[5px] ">
                              References
                            </span>
                          </span>
                        </div>
                        <div className="mt-[15px] ml-6" ref={termsSection}>
                          <ul className="mb-2 pl-5 lg:pl-[44px]">
                            <li className="mb-3 list-decimal"> <a href="https://www.iso.org/standard/27001" target="_blank" className="font-bold text-cs-purple-500 underline"> ISO/IEC 27001

2022 Information Security Management</a>
                            </li>
                            <li className="mb-3 list-decimal">
                              <a href="https://www.nist.gov/cyberframework" target="_blank" className="font-bold text-cs-purple-500 underline"> NIST (National Institute of Standards and Technology) Cybersecurity
                              Framework </a>
                            </li>
                            <li className="mb-3 list-decimal ">                        <a href="https://commission.europa.eu/law/law-topic/data-protection_en" target="_blank" className="font-bold text-cs-purple-500 underline">General Data Protection Regulation (GDPR) </a>
                            </li>
                            <li className="mb-3 list-decimal "> 
                              <a href="https://www.cisecurity.org/controls" target="_blank" className="font-bold text-cs-purple-500 underline"> Centre for Internet Security (CIS) Controls
                              </a>
                            </li>
                            <li className="mb-3 list-decimal "> 
                              <a href="https://owasp.org/" target="_blank" className="font-bold text-cs-purple-500 underline">OWASP (Open Web Application Security Project)
                              </a>
                            </li>  <li className="mb-3 list-decimal "> 
                              <a href="https://www.pcisecuritystandards.org/" target="_blank" className="font-bold text-cs-purple-500 underline">Payment Card Industry Data Security Standard (PCI-DSS)
                              </a>
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