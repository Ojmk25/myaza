import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useSessionStorage } from "@/hooks/useStorage";
import { IsAuthenticated, } from "@/services/authService";
import Head from "next/head";
import TermsNav from "@/components/TermsNav";
import Link from "next/link"

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
  const signUpDection = React.useRef(null);
  const recordMeetingSection = React.useRef(null);
  const serviceSection = React.useRef(null);
  const profileEditSection = React.useRef(null);
  const remoteAccess = React.useRef(null);
  const internetUsage = React.useRef(null);
  const softwareLicense = React.useRef(null);
  const passwordManagement = React.useRef(null);
  const monitoringPrivacy = React.useRef(null);
  const reportingSecurity = React.useRef(null);
  const disciplinaryActions = React.useRef(null);
 

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
              <h1 className="text-center mt-12 font-bold text-xl lg:text-5xl text-[#080808]">Acceptance Use Policy</h1>
              <p className=" text-xl text-center my-4 leading-[26px] text-cs-purple-500 px-2 ">
                Last Updated January, 2025
              </p>
              <TermsNav />
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
                            <span className="ml-[5px]">Abuse program policies and enforcement</span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(signUpDection)}
                          >
                            2<span className="ml-[5px]">Report Abuse</span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(signInSection)}
                          >
                            3{" "}
                            <span className="ml-[5px]">
                              Program Policies                            </span>
                          </div>
                          <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(signInSection)}
                            >
                              <span className="ml-[5px]">
                                3.1  Child Sexual Abuse and Exploitation
                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(createSessionSection)}
                            >
                              <span className="ml-[5px]">
                                3.2  Circumvention
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(serviceSection)}
                            >
                              <span className="ml-[5px]">
                                3.3  Dangerous & Illegal Activities
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(switchCameraSection)}
                            >
                              <span className="ml-[5px]">
                                3.4 Fraud, Phishing, and Other Deceptive Practices
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(emojiReactionSection)}
                            >
                              <span className="ml-[5px]">
                                3.5  Harassment, Bullying, & Threats 

                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(recordMeetingSection)}
                            >
                              <span className="ml-[5px]">
                                3.6  Hate Speech
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(profileEditSection)}
                            >
                              <span className="ml-[5px]">
                                3.7  Malware & Similar Malicious Content
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(remoteAccess)}
                            >
                              <span className="ml-[5px]">
                                3.8  Personal and Confidential Information
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(internetUsage)}
                            >
                              <span className="ml-[5px]">
                                3.9  Regulated Goods & Services 

                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(softwareLicense)}
                            >
                              <span className="ml-[5px]">
                                3.10  Sexually Explicit Content 
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(monitoringPrivacy)}
                            >
                              <span className="ml-[5px]">
                                3.11  Spam 
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(passwordManagement)}
                            >
                              <span className="ml-[5px]">
                                3.12  System Interference
                              </span>
                            </div> <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(reportingSecurity)}
                            >
                              <span className="ml-[5px]">
                                3.13  Terrorist Content

                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(disciplinaryActions)}
                            >
                              <span className="ml-[5px]">
                                3.14 Violence & Gore 


                              </span>
                            </div>
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
                          1.<span className="ml-[5px] font-bold">Abuse program policies and enforcement
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-[15px] ml-6">

                      <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        The content policies listed below play an important role in maintaining a positive experience for our users. We need to curb abuses that threaten our ability to provide this service, and we ask that everyone abide by the policies below to help us achieve this goal.
                        These policies apply to CecureStream. When applying these policies, we may make exceptions based on educational, documentary, scientific, or artistic considerations, or where there are other substantial benefits to the users of the service. Be sure to check back from time to time, as these policies may change. Please also refer to <Link className="text-cs-purple-500 font-semibold" href="/terms-of-service">our Terms of Service </Link> for more information.

                      </p>


                    </div>
                  </div>

                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={signUpDection}>
                        <span className="text-zinc-900 text-xl font-bold">
                          2
                          <span className="ml-[5px]  font-bold">Report Abuse</span>
                        </span>
                      </div>

                    </div>

                    <div className="mt-[15px] ml-6">

                      <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">This policy applies to all employees, contractors, consultants, temporary workers,
                        If you believe that someone is violating the policies found below, report abuse by emailing  <a href="mailto:helpdesk@cil.support" target="_blank" className="font-bold text-cs-purple-500 underline">helpdesk@cil.support.</a>  </p>
                      <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">CIL may disable your ability to use CecureStream or disable accounts that are found to be in violation of these policies. If your service has been suspended or your account has been disabled, and you believe it was a mistake, please contact us at <a href="mailto:helpdesk@cil.support" target="_blank" className="font-bold text-cs-purple-500 underline">helpdesk@cil.support.</a></p>
                    </div>


                  </div>

                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={signInSection}>
                        <span className="text-zinc-900 text-xl font-bold">
                          3
                          <span className="ml-[5px]  font-bold">
                            Program Policies                         </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={accessingAccountSection}>
                        <p className="ml-[8px] mb-2 font-bold text-zinc-900 text-base font-lota leading-relaxed">
                          3.1 Child Sexual Abuse and Exploitation
                        </p>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                            Do not use CecureStream to create, upload, or distribute content that exploits or abuses children. This includes all child sexual abuse materials.                       </li>
                          <li className="mb-3 list-disc leading-5">
                            More broadly, CecureStream prohibits the use of our products to endanger children. This includes but is not limited to predatory behavior towards children such as:                      </li>
                          <ul className="pl-[5px] lg:pl-[44px] my-4">
                            <li className="mb-3 list-disc leading-5 ">
                              ‘Child grooming’(for example, befriending a child online to facilitate, either online or offline, sexual contact and/or exchanging sexual imagery with that child);    </li>
                            <li className="mb-3 list-disc leading-5">
                              ‘Sextortion’ (for example, threatening or blackmailing a child by using real or alleged access to a child’s intimate images);   </li>
                            <li className="mb-3 list-disc leading-5">
                              Sexualization of a minor (for example, imagery that depicts, encourages or promotes the sexual abuse of children or the portrayal of children in a manner that could result in the sexual exploitation of children); and </li>
                            <li className="mb-3 list-disc leading-5">
                              Trafficking of a child (for example, advertising or solicitation of a child for commercial sexual exploitation).  </li>
                          </ul>
                        </ul>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                          We will take appropriate action, which may include reporting to the relevant authorities such as the National Center for Missing & Exploited Children, limiting access to product features, and disabling accounts. If you believe a child is in danger of or has been subject to abuse, exploitation, or trafficking, contact the police immediately. </p>
                      </div>

                      <div className="mt-[15px] ml-6" ref={createSessionSection}>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-bold font-lota leading-relaxed">
                          3.2 Circumvention
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                          Do not engage in actions intended to bypass our policies or subvert restrictions placed on your account. This includes the creation or use of multiple accounts or other methods intended to engage in a behavior that was previously prohibited. </p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={serviceSection}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.3   Dangerous & Illegal Activities
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                          Do not use CecureStream to promote, organize, or engage in illegal activities or activities that cause serious and immediate physical harm to people or animals. </p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={switchCameraSection}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.4   Fraud, Phishing, and Other Deceptive Practices
                        </p>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">
                          Do not use CecureStream for phishing. Refrain from soliciting or collecting sensitive data, including but not limited to passwords, financial details, and Social Security numbers. Do not use CecureStream to trick, mislead, or deceive other users into sharing information under false pretenses.
                          </li>
                          <li className="mb-3 list-disc leading-5">
                          Do not impersonate another person or otherwise misrepresent yourself or the source of a CecureStream invitation or join request with the intent to deceive, mislead, or defraud. </li>
                        
                        </ul>
                      </div>
                      <div className="mt-[15px] ml-6" ref={emojiReactionSection}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.5   Harassment, Bullying, & Threats 
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        Do not harass, bully, or threaten others. We also don’t allow this product to be used to engage or incite others in these activities. Keep in mind that online harassment is illegal in many places and can have serious offline consequences for both the harasser and the victim. We may take appropriate action if we are notified of threats of harm or other dangerous situations, which may include reporting you to the relevant authorities. </p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={recordMeetingSection}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.6   Hate Speech
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        Do not engage in hate speech. Hate speech is content that promotes or condones violence against or has the primary purpose of inciting hatred against an individual or group on the basis of their race or ethnic origin, religion, disability, age, nationality, veteran status, sexual orientation, gender, gender identity, or any other characteristic that is associated with systemic discrimination or marginalization.</p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={profileEditSection}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.7   Malware & Similar Malicious Content
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        Do not transmit malware or any content that harms or interferes with the operation of the networks, servers, end user devices, or other infrastructure. This includes the direct hosting, embedding, or transmission of malware, viruses, destructive code, or other harmful or unwanted software or similar content. This also includes content that transmits viruses, causes pop-ups, attempts to install software without the user’s consent, or otherwise impacts users with malicious code.</p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={remoteAccess}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.8   Personal and Confidential Information
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        Do not share or distribute other people’s personal or confidential information without authorization. ​This includes the use of sensitive information, such as U.S. Social Security numbers, bank account numbers, credit card numbers, images of signatures, and personal health documents. In most cases where this information is broadly available elsewhere on the internet or in public records, like national ID numbers listed on a government website, we generally don’t process enforcement actions. 
                        </p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={internetUsage}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.9   Regulated Goods & Services 

                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        ​Do not sell, advertise, or facilitate the sale of regulated goods and services. Regulated goods and services include alcohol, gambling, pharmaceuticals, unapproved supplements, tobacco, fireworks, weapons, or health/medical devices.</p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={softwareLicense}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.10   Sexually Explicit Content
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        Do not share or distribute content that contains sexually explicit material, such as nudity, graphic sex acts, and pornographic content. This includes driving traffic to commercial pornography sites. We allow content for educational, documentary, scientific, or artistic purposes.
                        </p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={monitoringPrivacy}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.11   Spam 
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        Do not spam. This may include unwanted promotional or commercial content, unwanted content that is created by an automated program, unwanted repetitive content, nonsensical content, or anything that appears to be a mass solicitation. </p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={passwordManagement}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.12   System Interference 
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        Do not abuse this product and do not harm, degrade, or negatively affect the operation of networks, devices, or other infrastructure. This includes degrading, disabling, or negatively interfering with any aspect of the product or its services.
                        </p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={reportingSecurity}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.13   Terrorist Content
 
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        Terrorist organizations are not permitted to use this product for any purpose, including recruitment. We’ll also take action against Meeting organizers or participants for content related to terrorism, such as promoting terrorist acts, inciting violence, or celebrating terrorist attacks.  </p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={disciplinaryActions}>
                        <p className="ml-[8px] mb-2 text-zinc-900 font-bold text-base  font-lota leading-relaxed">
                          3.14   Violence & Gore
 
                        </p>
                        <p className="ml-[8px] mb-2 text-zinc-900 text-base font-light font-lota leading-relaxed">
                        Do not share or distribute violent or gory content involving real-life people or animals that’s primarily intended to be shocking, sensational, or gratuitous. This includes ultra-graphic violence, such as dismemberment or close-up footage of mutilated corpses. Graphic violence, such as content containing significant amounts of blood, may be allowed in an educational, documentary, scientific, or artistic context, but please be mindful to provide enough information to help people understand the context. In some cases, content may be so violent or shocking that no amount of context will allow that content to remain on our platforms. Lastly, don&apos;t encourage others to commit specific acts of violence.
                        </p>
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