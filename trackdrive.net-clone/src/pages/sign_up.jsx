// /sign_up.html
export const meta = {
  title: "Sign Up | Avortyx",
  description: "Create your Avortyx account and start tracking, routing and selling calls.",
  bodyClass: "avortyx_marketing users_sign_up without-waves",
  layout: "site",
}

export default function SignUp() {
  return (
    <main>
      <section className="mktg-auth-section">
        <div className="container">
          <div className="mktg-auth-card mktg-auth-card--wide">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-2">Create Your Account</h2>
              <p className="text-muted mb-1">No credit card required, no onboarding fees — sign up in a couple of minutes.</p>
              <p className="text-muted mb-0">
                Already have an account?{" "}
                <a href="/users/sign_in.html" className="text-decoration-none fw-semibold mktg-link-green">Sign in</a>
              </p>
            </div>
            <form className="simple_form mktg-auth-form" id="new_registration" noValidate action="https://avortyx.com/users/" acceptCharset="UTF-8" method="post">
              <input name="utf8" type="hidden" value="✓" autoComplete="off" />
              <input type="hidden" name="authenticity_token" value="DzPdo1px3NKPAzIgeeEidQA9qloeUkIXqN4DbmZ6mgshttM1RfdhsMezOozO9Ku4VpohL3u3VlNunhQa0bvG3g" autoComplete="off" />
              {" "}
              <input className="hidden" autoComplete="off" type="hidden" name="registration[referral_token]" id="registration_referral_token" />
              {" "}
              <input autoComplete="off" type="hidden" name="registration[referral_subid]" id="registration_referral_subid" />
              {" "}
              <input autoComplete="off" type="hidden" name="registration[referral_token_resolved]" id="registration_referral_token_resolved" />
              <div className="row mb-3 js-form-validation form-group email required registration_email">
                <label className="col-sm-3 col-form-label text-start text-sm-end email required" htmlFor="registration_email">
                  <abbr title="required">*</abbr>
                  {" "}Email
                </label>
                <div className="col-sm-9">
                  <input className="form-control string email required" placeholder="you@company.com" required aria-required="true" type="email" name="registration[email]" id="registration_email" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string required registration_first_name">
                <label className="col-sm-3 col-form-label text-start text-sm-end string required" htmlFor="registration_first_name">
                  <abbr title="required">*</abbr>
                  {" "}First Name
                </label>
                <div className="col-sm-9">
                  <input className="form-control string required" placeholder="John" required aria-required="true" type="text" name="registration[first_name]" id="registration_first_name" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string required registration_last_name">
                <label className="col-sm-3 col-form-label text-start text-sm-end string required" htmlFor="registration_last_name">
                  <abbr title="required">*</abbr>
                  {" "}Last Name
                </label>
                <div className="col-sm-9">
                  <input className="form-control string required" placeholder="Doe" required aria-required="true" type="text" name="registration[last_name]" id="registration_last_name" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string required registration_company_name">
                <label className="col-sm-3 col-form-label text-start text-sm-end string required" htmlFor="registration_company_name">
                  <abbr title="required">*</abbr>
                  {" "}Company Name
                </label>
                <div className="col-sm-9">
                  <input className="form-control string required" placeholder="Company Name" required aria-required="true" type="text" name="registration[company_name]" id="registration_company_name" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group tel required registration_phone_1">
                <label className="col-sm-3 col-form-label text-start text-sm-end tel required" htmlFor="registration_phone_1">
                  <abbr title="required">*</abbr>
                  {" "}Phone Number
                </label>
                <div className="col-sm-9">
                  <input className="form-control string tel required" placeholder="1-800 ..." required aria-required="true" type="tel" name="registration[phone_1]" id="registration_phone_1" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string optional registration_microsoft_teams">
                <label className="col-sm-3 col-form-label text-start text-sm-end string optional" htmlFor="registration_microsoft_teams">
                  Teams{" "}
                  <small className="text-muted">(for support)</small>
                </label>
                <div className="col-sm-9">
                  <input className="form-control string optional" placeholder={"\"Invite to Teams\" link"} type="text" name="registration[microsoft_teams]" id="registration_microsoft_teams" />
                  <div className="form-text">Your email will be used if this is blank</div>
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string required registration_address_line1">
                <label className="col-sm-3 col-form-label text-start text-sm-end string required" htmlFor="registration_address_line1">
                  <abbr title="required">*</abbr>
                  {" "}Company Address
                </label>
                <div className="col-sm-9">
                  <input className="form-control string required" placeholder="Street Address" required aria-required="true" type="text" name="registration[address_line1]" id="registration_address_line1" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string required registration_address_city">
                <label className="col-sm-3 col-form-label text-start text-sm-end string required" htmlFor="registration_address_city">
                  <abbr title="required">*</abbr>
                  {" "}City
                </label>
                <div className="col-sm-9">
                  <input className="form-control string required" placeholder="San Francisco" required aria-required="true" type="text" name="registration[address_city]" id="registration_address_city" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string required registration_address_state">
                <label className="col-sm-3 col-form-label text-start text-sm-end string required" htmlFor="registration_address_state">
                  <abbr title="required">*</abbr>
                  {" "}State / Province
                </label>
                <div className="col-sm-9">
                  <input className="form-control string required" placeholder="California" required aria-required="true" type="text" name="registration[address_state]" id="registration_address_state" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group country required registration_address_country">
                <label className="col-sm-3 col-form-label text-start text-sm-end country required" htmlFor="registration_address_country">
                  <abbr title="required">*</abbr>
                  {" "}Country
                </label>
                <div className="col-sm-9">
                  <select skip_default_ids="false" allow_method_names_outside_object="false" className="form-control select2" name="registration[address_country]" id="registration_address_country">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <hr />
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Åland Islands</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="AQ">Antarctica</option>
                    <option value="AG">Antigua and Barbuda</option>
                    <option value="AR">Argentina</option>
                    <option value="AM">Armenia</option>
                    <option value="AW">Aruba</option>
                    <option value="AU">Australia</option>
                    <option value="AT">Austria</option>
                    <option value="AZ">Azerbaijan</option>
                    <option value="BS">Bahamas</option>
                    <option value="BH">Bahrain</option>
                    <option value="BD">Bangladesh</option>
                    <option value="BB">Barbados</option>
                    <option value="BY">Belarus</option>
                    <option value="BE">Belgium</option>
                    <option value="BZ">Belize</option>
                    <option value="BJ">Benin</option>
                    <option value="BM">Bermuda</option>
                    <option value="BT">Bhutan</option>
                    <option value="BO">Bolivia</option>
                    <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                    <option value="BA">Bosnia and Herzegovina</option>
                    <option value="BW">Botswana</option>
                    <option value="BV">Bouvet Island</option>
                    <option value="BR">Brazil</option>
                    <option value="IO">British Indian Ocean Territory</option>
                    <option value="BN">Brunei Darussalam</option>
                    <option value="BG">Bulgaria</option>
                    <option value="BF">Burkina Faso</option>
                    <option value="BI">Burundi</option>
                    <option value="CV">Cabo Verde</option>
                    <option value="KH">Cambodia</option>
                    <option value="CM">Cameroon</option>
                    <option value="CA">Canada</option>
                    <option value="KY">Cayman Islands</option>
                    <option value="CF">Central African Republic</option>
                    <option value="TD">Chad</option>
                    <option value="CL">Chile</option>
                    <option value="CN">China</option>
                    <option value="CX">Christmas Island</option>
                    <option value="CC">Cocos (Keeling) Islands</option>
                    <option value="CO">Colombia</option>
                    <option value="KM">Comoros</option>
                    <option value="CG">Congo</option>
                    <option value="CD">Congo, The Democratic Republic of the</option>
                    <option value="CK">Cook Islands</option>
                    <option value="CR">Costa Rica</option>
                    <option value="CI">Côte d'Ivoire</option>
                    <option value="HR">Croatia</option>
                    <option value="CU">Cuba</option>
                    <option value="CW">Curaçao</option>
                    <option value="CY">Cyprus</option>
                    <option value="CZ">Czechia</option>
                    <option value="DK">Denmark</option>
                    <option value="DJ">Djibouti</option>
                    <option value="DM">Dominica</option>
                    <option value="DO">Dominican Republic</option>
                    <option value="EC">Ecuador</option>
                    <option value="EG">Egypt</option>
                    <option value="SV">El Salvador</option>
                    <option value="GQ">Equatorial Guinea</option>
                    <option value="ER">Eritrea</option>
                    <option value="EE">Estonia</option>
                    <option value="SZ">Eswatini</option>
                    <option value="ET">Ethiopia</option>
                    <option value="FK">Falkland Islands (Malvinas)</option>
                    <option value="FO">Faroe Islands</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finland</option>
                    <option value="FR">France</option>
                    <option value="GF">French Guiana</option>
                    <option value="PF">French Polynesia</option>
                    <option value="TF">French Southern Territories</option>
                    <option value="GA">Gabon</option>
                    <option value="GM">Gambia</option>
                    <option value="GE">Georgia</option>
                    <option value="DE">Germany</option>
                    <option value="GH">Ghana</option>
                    <option value="GI">Gibraltar</option>
                    <option value="GR">Greece</option>
                    <option value="GL">Greenland</option>
                    <option value="GD">Grenada</option>
                    <option value="GP">Guadeloupe</option>
                    <option value="GU">Guam</option>
                    <option value="GT">Guatemala</option>
                    <option value="GG">Guernsey</option>
                    <option value="GN">Guinea</option>
                    <option value="GW">Guinea-Bissau</option>
                    <option value="GY">Guyana</option>
                    <option value="HT">Haiti</option>
                    <option value="HM">Heard Island and McDonald Islands</option>
                    <option value="VA">Holy See (Vatican City State)</option>
                    <option value="HN">Honduras</option>
                    <option value="HK">Hong Kong</option>
                    <option value="HU">Hungary</option>
                    <option value="IS">Iceland</option>
                    <option value="IN">India</option>
                    <option value="ID">Indonesia</option>
                    <option value="IR">Iran</option>
                    <option value="IQ">Iraq</option>
                    <option value="IE">Ireland</option>
                    <option value="IM">Isle of Man</option>
                    <option value="IL">Israel</option>
                    <option value="IT">Italy</option>
                    <option value="JM">Jamaica</option>
                    <option value="JP">Japan</option>
                    <option value="JE">Jersey</option>
                    <option value="JO">Jordan</option>
                    <option value="KZ">Kazakhstan</option>
                    <option value="KE">Kenya</option>
                    <option value="KI">Kiribati</option>
                    <option value="KW">Kuwait</option>
                    <option value="KG">Kyrgyzstan</option>
                    <option value="LA">Lao People's Democratic Republic</option>
                    <option value="LV">Latvia</option>
                    <option value="LB">Lebanon</option>
                    <option value="LS">Lesotho</option>
                    <option value="LR">Liberia</option>
                    <option value="LY">Libya</option>
                    <option value="LI">Liechtenstein</option>
                    <option value="LT">Lithuania</option>
                    <option value="LU">Luxembourg</option>
                    <option value="MO">Macao</option>
                    <option value="MG">Madagascar</option>
                    <option value="MW">Malawi</option>
                    <option value="MY">Malaysia</option>
                    <option value="MV">Maldives</option>
                    <option value="ML">Mali</option>
                    <option value="MT">Malta</option>
                    <option value="MH">Marshall Islands</option>
                    <option value="MQ">Martinique</option>
                    <option value="MR">Mauritania</option>
                    <option value="MU">Mauritius</option>
                    <option value="YT">Mayotte</option>
                    <option value="MX">Mexico</option>
                    <option value="FM">Micronesia, Federated States of</option>
                    <option value="MD">Moldova</option>
                    <option value="MC">Monaco</option>
                    <option value="MN">Mongolia</option>
                    <option value="ME">Montenegro</option>
                    <option value="MS">Montserrat</option>
                    <option value="MA">Morocco</option>
                    <option value="MZ">Mozambique</option>
                    <option value="MM">Myanmar</option>
                    <option value="NA">Namibia</option>
                    <option value="NR">Nauru</option>
                    <option value="NP">Nepal</option>
                    <option value="NL">Netherlands</option>
                    <option value="NC">New Caledonia</option>
                    <option value="NZ">New Zealand</option>
                    <option value="NI">Nicaragua</option>
                    <option value="NE">Niger</option>
                    <option value="NG">Nigeria</option>
                    <option value="NU">Niue</option>
                    <option value="NF">Norfolk Island</option>
                    <option value="KP">North Korea</option>
                    <option value="MK">North Macedonia</option>
                    <option value="MP">Northern Mariana Islands</option>
                    <option value="NO">Norway</option>
                    <option value="OM">Oman</option>
                    <option value="PK">Pakistan</option>
                    <option value="PW">Palau</option>
                    <option value="PS">Palestine, State of</option>
                    <option value="PA">Panama</option>
                    <option value="PG">Papua New Guinea</option>
                    <option value="PY">Paraguay</option>
                    <option value="PE">Peru</option>
                    <option value="PH">Philippines</option>
                    <option value="PN">Pitcairn</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="PR">Puerto Rico</option>
                    <option value="QA">Qatar</option>
                    <option value="RE">Réunion</option>
                    <option value="RO">Romania</option>
                    <option value="RU">Russian Federation</option>
                    <option value="RW">Rwanda</option>
                    <option value="BL">Saint Barthélemy</option>
                    <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                    <option value="KN">Saint Kitts and Nevis</option>
                    <option value="LC">Saint Lucia</option>
                    <option value="MF">Saint Martin (French part)</option>
                    <option value="PM">Saint Pierre and Miquelon</option>
                    <option value="VC">Saint Vincent and the Grenadines</option>
                    <option value="WS">Samoa</option>
                    <option value="SM">San Marino</option>
                    <option value="ST">Sao Tome and Principe</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="SN">Senegal</option>
                    <option value="RS">Serbia</option>
                    <option value="SC">Seychelles</option>
                    <option value="SL">Sierra Leone</option>
                    <option value="SG">Singapore</option>
                    <option value="SX">Sint Maarten (Dutch part)</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="SB">Solomon Islands</option>
                    <option value="SO">Somalia</option>
                    <option value="ZA">South Africa</option>
                    <option value="GS">South Georgia and the South Sandwich Islands</option>
                    <option value="KR">South Korea</option>
                    <option value="SS">South Sudan</option>
                    <option value="ES">Spain</option>
                    <option value="LK">Sri Lanka</option>
                    <option value="SD">Sudan</option>
                    <option value="SR">Suriname</option>
                    <option value="SJ">Svalbard and Jan Mayen</option>
                    <option value="SE">Sweden</option>
                    <option value="CH">Switzerland</option>
                    <option value="SY">Syrian Arab Republic</option>
                    <option value="TW">Taiwan</option>
                    <option value="TJ">Tajikistan</option>
                    <option value="TZ">Tanzania</option>
                    <option value="TH">Thailand</option>
                    <option value="TL">Timor-Leste</option>
                    <option value="TG">Togo</option>
                    <option value="TK">Tokelau</option>
                    <option value="TO">Tonga</option>
                    <option value="TT">Trinidad and Tobago</option>
                    <option value="TN">Tunisia</option>
                    <option value="TR">Türkiye</option>
                    <option value="TM">Turkmenistan</option>
                    <option value="TC">Turks and Caicos Islands</option>
                    <option value="TV">Tuvalu</option>
                    <option value="UG">Uganda</option>
                    <option value="UA">Ukraine</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="GB">United Kingdom</option>
                    <option value="US">United States</option>
                    <option value="UM">United States Minor Outlying Islands</option>
                    <option value="UY">Uruguay</option>
                    <option value="UZ">Uzbekistan</option>
                    <option value="VU">Vanuatu</option>
                    <option value="VE">Venezuela</option>
                    <option value="VN">Vietnam</option>
                    <option value="VG">Virgin Islands, British</option>
                    <option value="VI">Virgin Islands, U.S.</option>
                    <option value="WF">Wallis and Futuna</option>
                    <option value="EH">Western Sahara</option>
                    <option value="YE">Yemen</option>
                    <option value="ZM">Zambia</option>
                    <option value="ZW">Zimbabwe</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group string optional registration_where_did_you_hear">
                <label className="col-sm-3 col-form-label text-start text-sm-end string optional" htmlFor="registration_where_did_you_hear">How did you hear about us?</label>
                <div className="col-sm-9">
                  <input className="form-control string optional select2" include_blank="false" placeholder="Google, Facebook, Email?" type="text" name="registration[where_did_you_hear]" id="registration_where_did_you_hear" />
                </div>
              </div>
              <div className="row mb-3 js-form-validation form-group check_boxes optional registration_feature_interests">
                <label className="col-sm-3 col-form-label pt-0 check_boxes optional">Features of interest</label>
                <div className="col-sm-9">
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Real Time Ping/Post" name="registration[feature_interests][]" id="registration_feature_interests_real_time_pingpost" />
                    <label className="form-check-label collection_check_boxes" htmlFor="registration_feature_interests_real_time_pingpost">Real Time Ping/Post</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="AI Voice Agents" name="registration[feature_interests][]" id="registration_feature_interests_ai_voice_agents" />
                    <label className="form-check-label collection_check_boxes" htmlFor="registration_feature_interests_ai_voice_agents">AI Voice Agents</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Call Tracking" name="registration[feature_interests][]" id="registration_feature_interests_call_tracking" />
                    <label className="form-check-label collection_check_boxes" htmlFor="registration_feature_interests_call_tracking">Call Tracking</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Call Transcription" name="registration[feature_interests][]" id="registration_feature_interests_call_transcription" />
                    <label className="form-check-label collection_check_boxes" htmlFor="registration_feature_interests_call_transcription">Call Transcription</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Agents / Call Centers" name="registration[feature_interests][]" id="registration_feature_interests_agents__call_centers" />
                    <label className="form-check-label collection_check_boxes" htmlFor="registration_feature_interests_agents__call_centers">Agents / Call Centers</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Lead Automation" name="registration[feature_interests][]" id="registration_feature_interests_lead_automation" />
                    <label className="form-check-label collection_check_boxes" htmlFor="registration_feature_interests_lead_automation">Lead Automation</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input check_boxes optional" type="checkbox" value="Spam Tag Mitigation" name="registration[feature_interests][]" id="registration_feature_interests_spam_tag_mitigation" />
                    <label className="form-check-label collection_check_boxes" htmlFor="registration_feature_interests_spam_tag_mitigation">Spam Tag Mitigation</label>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-9 offset-sm-3" />
              </div>
              <div className="row mt-4 pt-3 border-top">
                <div className="col-sm-9 offset-sm-3">
                  <div className="d-flex align-items-start mb-3">
                    <input className="form-check-input flex-shrink-0 mt-1 me-2" type="checkbox" name="registration[sms_consent]" id="sms_consent" value="1" />
                    {" "}
                    <label className="form-check-label small text-muted" htmlFor="sms_consent">By checking this box, I verify that this is my phone number and that I would like to sign up to receive text messages from Avortyx, including verification codes. Message frequency may vary. Message & data rates may apply. Reply HELP for help or STOP to opt out.</label>
                  </div>
                  <fieldset className="mb-3 js-form-validation form-group boolean required registration_terms_of_service_accepted">
                    <div className="form-check">
                      <input className="form-check-input boolean required" data-fv-not-empty---message="Please accept the Terms of Service and Privacy Policy" required aria-required="true" type="checkbox" value="1" name="registration[terms_of_service_accepted]" id="registration_terms_of_service_accepted" />
                      <label className="form-check-label boolean required small text-muted" htmlFor="registration_terms_of_service_accepted">
                        <abbr title="required">*</abbr>
                        {" "}I have read and understand Avortyx's{" "}
                        <a href="/terms_of_service.html" target="_blank" className="text-decoration-none fw-semibold mktg-link-green">Terms of Service</a>
                        {" "}and{" "}
                        <a href="/privacy_policy.html" target="_blank" className="text-decoration-none fw-semibold mktg-link-green">Privacy Policy</a>
                        , and I accept and agree to all terms and conditions.
                      </label>
                    </div>
                  </fieldset>
                  <button className="btn btn-td-green px-4 py-2 fw-semibold" type="submit">Create Account</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
