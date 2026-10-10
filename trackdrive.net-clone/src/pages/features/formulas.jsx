// /features/formulas.html
export const meta = {
  title: "Formulas | Call Tracking and Analytics | Avortyx",
  description: "Powerful formulas for call routing rules, data transformations, and complex calculations.",
  bodyClass: "avortyx_marketing features_formulas ",
  layout: "feature",
}

export default function Formulas() {
  return (
    <main>
      <section className="mktg-subpage-hero">
        <div className="container">
          <div className="mktg-subpage-hero-nav">
            <a href="/features.html#tracking-attribution" className="mktg-subpage-back">
              {" "}
              <i className="fa-solid fa-arrow-left" />
              {" "}Back to Tracking & Attribution{" "}
            </a>
          </div>
          <p className="mktg-subpage-hero-eyebrow">Tracking & Attribution</p>
          <h1 className="fw-bold mb-2">Expressions & Functions</h1>
          <p className="lead mktg-subpage-hero-subtitle">Powerful formulas for call routing rules, data transformations, and complex calculations.</p>
          <div className="mktg-subpage-hero-cta mt-4 d-flex flex-wrap gap-2 justify-content-center">
            <a href="/p/request_demo.html" className="btn btn-td-green">Request Demo</a>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="marketing-subpage-content mx-auto">
            <p>Transform and calculate data on the fly. Expressions and functions extend what you can do with leads, webhooks, postbacks, and calls — and functions can be nested to build complex calculations.</p>
            <p className="text-muted">Use them anywhere token replacement is available, for example:</p>
            <ul className="text-muted">
              <li>Contact field defaults</li>
              <li>Webhook URLs and postback payloads</li>
              <li>Routing filters</li>
            </ul>
            <p>Expressions come in four types — String, Integer, Float, and Time — and the function arguments are coerced to that type when evaluated.</p>
            <div className="formula-doc">
              <h3>Example Data</h3>
              <p>{"Given the following example data, the expressions below would output the values as indicated by =>"}</p>
              <pre>{"{\n  \"first_name\": \"John\",\n  \"last_name\": \"Smith\",\n  \"birth_year\": \"1977\",\n  \"yob\": 2012,\n  \"mortgage_amount\": 65000,\n  \"debt_amount\": 8283.25,\n  \"started_at_utc\": \"2020-06-21 22:35:12 UTC\"\n}\n"}</pre>
            </div>
            <div className="formula-doc">
              <h3>String Example</h3>
              <p>Convert function arguments into strings and evaluate the expression.</p>
              <pre>{"[!String! ALPHANUMERIC_DASH(CONCAT([first_name], \" \", [last_name])) !!]\n=> john-smith\n"}</pre>
            </div>
            <div className="formula-doc">
              <h3>Time Example</h3>
              <p>Convert function arguments into Time and evaluate the expression.</p>
              <pre>{"[!Time! DATE_FORMAT(DATE_ADD([started_at_utc], 86400), \"%Y-%m-%d %M-%S\") !!]\n=> \"2020-06-22T18:35:12\"\n"}</pre>
            </div>
            <h3 className="mt-4 pt-3 border-top">Functions</h3>
            <div className="formula-doc">
              <h2>case<span className="params">(statement)</span></h2>
              <span className="formula-type-badge">logic</span>
              <p>A CASE statement that allows you to evaluate complex conditional logic.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>statement</td>
                  <td>Required</td>
                  <td>The statement that will be evaluated.</td>
                </tr>
              </table>
              <pre>{"CASE('apple' WHEN 'apple' THEN 1 WHEN 'banana' THEN 2 ELSE 3 END)\n=> 1\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>if<span className="params">(statement, output_when_true, output_when_false)</span></h2>
              <span className="formula-type-badge">logic</span>
              <p>Evaluate a statement and output a value when true or false.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>statement</td>
                  <td>Required</td>
                  <td>The statement that will be evaluated.</td>
                </tr>
                <tr>
                  <td>output_when_true</td>
                  <td>Required</td>
                  <td>The value that will be outputted if the statement evaluates to true.</td>
                </tr>
                <tr>
                  <td>output_when_false</td>
                  <td>Required</td>
                  <td>The value that will be outputted if the statement evaluates to false.</td>
                </tr>
              </table>
              <pre>{"IF(15 < 10, 10, 20)\n=> 20\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>avg<span className="params">(*values)</span></h2>
              <span className="formula-type-badge">numeric</span>
              <p>Get the average of the passed numeric values.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>*values</td>
                  <td>Required</td>
                  <td>This function accepts an unlimited number of numeric values.</td>
                </tr>
              </table>
              <pre>{"AVG(1,2,3,4)\n=> 2.5\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>count<span className="params">(*values)</span></h2>
              <span className="formula-type-badge">numeric</span>
              <p>Count the passed values.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>*values</td>
                  <td>Required</td>
                  <td>This function accepts an unlimited number of numeric values.</td>
                </tr>
              </table>
              <pre>{"COUNT(1,2,3,4)\n=> 4\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>max<span className="params">(*values)</span></h2>
              <span className="formula-type-badge">numeric</span>
              <p>Get the largest numeric value from the set of passed arguments.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>*values</td>
                  <td>Required</td>
                  <td>This function accepts an unlimited number of numeric values.</td>
                </tr>
              </table>
              <pre>{"MAX(1,2,3,4)\n=> 4\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>min<span className="params">(*values)</span></h2>
              <span className="formula-type-badge">numeric</span>
              <p>Get the smallest numeric value from the set of passed arguments.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>*values</td>
                  <td>Required</td>
                  <td>This function accepts an unlimited number of numeric values.</td>
                </tr>
              </table>
              <pre>{"MIN(1,2,3,4)\n=> 1\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>round<span className="params">(value, precision)</span></h2>
              <span className="formula-type-badge">numeric</span>
              <p>Returns float rounded to the nearest value.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The value to be rounded. EG:<br /><code>{"ROUND(8.8) => 9"}<br />{"ROUND(8.2) => 8"}<br /></code></td>
                </tr>
                <tr>
                  <td>precision</td>
                  <td>Optional</td>
                  <td>The precision to be used. EG:<br /><code>{"ROUND(8.75, 1) => 8.8"}</code></td>
                </tr>
              </table>
              <pre>{"ROUND(8.2)\n=> 8\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>rounddown<span className="params">(value, precision)</span></h2>
              <span className="formula-type-badge">numeric</span>
              <p>Returns float rounded down to the nearest value.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The value to be rounded. EG:<br /><code>{"ROUND(8.8) => 8"}</code></td>
                </tr>
                <tr>
                  <td>precision</td>
                  <td>Optional</td>
                  <td>The precision to be used. EG:<br /><code>{"ROUND(1.234, 2) => 1.23"}</code></td>
                </tr>
              </table>
              <pre>{"ROUNDDOWN(1.234)\n=> 1\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>roundup<span className="params">(value, precision)</span></h2>
              <span className="formula-type-badge">numeric</span>
              <p>Returns float rounded up to the nearest value.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The value to be rounded. EG:<br /><code>{"ROUND(8.8) => 9"}</code></td>
                </tr>
                <tr>
                  <td>precision</td>
                  <td>Optional</td>
                  <td>The precision to be used. EG:<br /><code>{"ROUND(1.234, 2) => 1.24"}</code></td>
                </tr>
              </table>
              <pre>{"ROUNDUP(1.234)\n=> 2\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>sum<span className="params">(*values)</span></h2>
              <span className="formula-type-badge">numeric</span>
              <p>Get the sum of the numeric values.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>*values</td>
                  <td>Required</td>
                  <td>This function accepts an unlimited number of numeric values.</td>
                </tr>
              </table>
              <pre>{"SUM(1,2,3,4)\n=> 10\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>alphanumeric_dash<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver with only alphanumeric characters (0-9 and a-z A-Z) and spaces converted to dashes. Leading and trailing spaces are removed.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"ALPHANUMERIC_DASH(\" ./;!!!]  hello waffle world!@#$%^&*($)  \")\n=> \"hello-waffle-world\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>alphanumeric_underscore<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver with only alphanumeric characters (0-9 and a-z A-Z) and spaces converted to underscores. Leading and trailing spaces are removed.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"ALPHANUMERIC_UNDERSCORE(\" ./;!!!]  hello waffle world!@#$%^&*($)  \")\n=> \"hello_waffle_world\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>base64_decode<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns the Base64-decoded version of str. This method complies with RFC 2045. Characters outside the base alphabet are ignored.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"BASE64_DECODE('dGVzdA==')\n=> 'text'\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>base64_encode<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns the Base64-encoded version of bin. This method complies with RFC 2045. Line feeds are added to every 60 encoded characters.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"BASE64_ENCODE('text')\n=> 'dGVzdA=='\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>concat<span className="params">(*values)</span></h2>
              <span className="formula-type-badge">string</span>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>*values</td>
                  <td>Required</td>
                  <td>This function accepts an unlimited number of string values.</td>
                </tr>
              </table>
              <pre>{"CONCAT('AB', 'CD', 'EF')\n=> \"ABCDEF\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>contains<span className="params">(search, value)</span></h2>
              <span className="formula-type-badge">string</span>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>search</td>
                  <td>Required</td>
                  <td>Outputs true if [value] contains this string.</td>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The string that will be checked.</td>
                </tr>
              </table>
              <pre>{"CONTAINS('ABCD', 'A')\n=> true\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>date_add<span className="params">(value, seconds)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>The date_add function adds seconds to a date.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The date that will be modified.</td>
                </tr>
                <tr>
                  <td>seconds</td>
                  <td>Required</td>
                  <td>The seconds that will be added.</td>
                </tr>
              </table>
              <pre>{"DATE_ADD([started_at_utc], 86400)\n=> \"2020-06-29 11:34:25 -0400\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>date_format<span className="params">(value, format)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Format a date</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The date that will be modified. EG '2020-06-29 11:22:57 -0400'</td>
                </tr>
                <tr>
                  <td>format</td>
                  <td>Required</td>
                  <td>
                    Specifies the format for the date. The following characters can be used.
                    <br />
                    <br />
                    {" "}
                    <strong>Date (Year, Month, Day):</strong>
                    <br />
                    {" "}%Y
                    <small> - Year with century</small>
                    <br />
                    {" "}%y
                    <small> - year % 100 (00..99)</small>
                    <br />
                    {" "}%m
                    <small> - Month of the year, zero-padded (01..12)</small>
                    <br />
                    {" "}%B
                    <small> - The full month name (``January'')</small>
                    <br />
                    {" "}%b
                    <small> - The abbreviated month name (``Jan'')</small>
                    <br />
                    {" "}%d
                    <small> - Day of the month, zero-padded (01..31)</small>
                    <br />
                    {" "}%j
                    <small> - Day of the year (001..366)</small>
                    <br />
                    <br />
                    {" "}
                    <strong>Time</strong>
                    <br />
                    {" "}%H
                    <small> - Hour of the day, 24-hour clock, zero-padded (00..23)</small>
                    <br />
                    {" "}%I
                    <small> - Hour of the day, 12-hour clock, zero-padded (01..12)</small>
                    <br />
                    {" "}%P
                    <small> - Meridian indicator, lowercase (``am'' or ``pm'')</small>
                    <br />
                    {" "}%p
                    <small> - Meridian indicator, uppercase (``AM'' or ``PM'')</small>
                    <br />
                    {" "}%M
                    <small> - Minute of the hour (00..59)</small>
                    <br />
                    {" "}%S
                    <small> - Second of the minute (00..59)</small>
                    <br />
                    {" "}%L
                    <small> - Millisecond of the second (000..999)</small>
                    <br />
                    {" "}%N
                    <small> - Fractional seconds digits, default is 9 digits (nanosecond)</small>
                    <br />
                    {" "}%z
                    <small> - Time zone as hour and minute offset from UTC (e.g. +0900)</small>
                    <br />
                    <br />
                    {" "}
                    <strong>Weekday</strong>
                    <br />
                    {" "}%A
                    <small> - The full weekday name (``Sunday'')</small>
                    <br />
                    {" "}%a
                    <small> - The abbreviated name (``Sun'')</small>
                    <br />
                    {" "}%u
                    <small> - Day of the week (Monday is 1, 1..7)</small>
                    <br />
                    {" "}%w
                    <small> - Day of the week (Sunday is 0, 0..6)</small>
                    <br />
                    <br />
                    {" "}
                    <strong>Seconds since the Unix Epoch</strong>
                    <br />
                    {" "}%s
                    <small>
                      {" "}- Number of seconds since 1970-01-01 00:00:00 UTC.
                      <br />
                      {" "}%Q
                      <small> - Number of milliseconds since 1970-01-01 00:00:00 UTC.<br /> </small>
                    </small>
                  </td>
                </tr>
              </table>
              <pre>{"DATE_FORMAT([started_at_utc], \"%Y-%m-%d %M-%S\")\n=> \"2020-06-22T18:35:12\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>date_parse<span className="params">(value, format)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>The date_parse function is a natural language date/time parser.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>
                    The date or natural language expression.
                    <br />
                    <br />
                    {" "}
                    <strong>Simple Examples</strong>
                    <br />
                    {" "}thursday
                    <br />
                    {" "}november
                    <br />
                    {" "}summer
                    <br />
                    {" "}friday 13:00
                    <br />
                    {" "}mon 2:35
                    <br />
                    {" "}4pm
                    <br />
                    {" "}yesterday
                    <br />
                    {" "}today
                    <br />
                    {" "}tomorrow
                    <br />
                    {" "}last week
                    <br />
                    {" "}next week
                    <br />
                    <br />
                    {" "}
                    <strong>Complex Examples</strong>
                    <br />
                    {" "}3 years ago
                    <br />
                    {" "}a year ago
                    <br />
                    {" "}5 months from now
                    <br />
                    {" "}7 hours ago
                    <br />
                    {" "}7 days from now
                    <br />
                    {" "}in 3 hours
                    <br />
                    <br />
                    {" "}
                    <strong>Specific Dates & Times</strong>
                    <br />
                    {" "}22nd of june at 8am
                    <br />
                    {" "}1979-05-27 05:00:00
                    <br />
                    {" "}03/01/2012 07:25:09.234567
                    <br />
                    {" "}2013-08-01T19:30:00.345-07:00
                    <br />
                    {" "}2013-08-01T19:30:00.34-07:00
                    <br />
                  </td>
                </tr>
                <tr>
                  <td>format</td>
                  <td>Optional</td>
                  <td />
                </tr>
              </table>
              <pre>{"DATE_PARSE(\"30 days from now\")\n=> \"2020-07-29 15:42:57 UTC\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>date_subtract<span className="params">(time, time_or_decimal)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>The date_subtract function subtracts another timestamp or decimal from the first argument.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>time</td>
                  <td>Required</td>
                  <td>The timestamp to be manipulated.</td>
                </tr>
                <tr>
                  <td>time_or_decimal</td>
                  <td>Required</td>
                  <td>The timestamp or decimal that will be subtracted from the first argument time.</td>
                </tr>
              </table>
              <pre>{"DATE_SUBTRACT([current_time_utc], [started_at_utc])\n=> \"2020-06-29 11:34:25 -0400\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>date_to_time_zone<span className="params">(value, time_zone)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>The date_to_time_zone returns a copy of the receiver in the given time zone.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>[lead_created_at]</td>
                </tr>
                <tr>
                  <td>time_zone</td>
                  <td>Required</td>
                  <td>
                    <div style={{ marginBottom: "10px" }}>Examples Time Zones:</div>
                    <ul>
                      <li>Eastern Time (US & Canada)</li>
                      <li>Central Time (US & Canada)</li>
                      <li>Mountain Time (US & Canada)</li>
                      <li>Pacific Time (US & Canada)</li>
                      <li>UTC</li>
                      <li>
                        <a href="https://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html" target="_blank" rel="noopener">Click here for a full list of time zones.</a>
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>
              <pre>{"DATE_TO_TIME_ZONE([lead_created_at], \"Eastern Time (US & Canada)\")\n=> \"2020-07-29 15:42:57\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>digest_md5<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>A method for calculating message digests using the MD5 Message-Digest Algorithm by RSA Data Security, Inc., described in RFC1321. MD5 calculates a digest of 128 bits (16 bytes).</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"DIGEST_MD5('text')\n=> 90015098...\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>digest_sha1<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>A method for calculating message digests using the SHA-1 Secure Hash Algorithm by NIST (the US' National Institute of Standards and Technology), described in FIPS PUB 180-1.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"DIGEST_SHA1('text')\n=> a9993e36...\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>digest_sha2<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>A method for calculating SHA256 which works on chunks of 512 bits and returns a 256-bit digest (SHA256)</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"DIGEST_SHA2('text')\n=> ba7816bf8...\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>downcase<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver with all letters converted to lowercase.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"DOWNCASE(\"HELLO World\")\n=> \"hello world\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>find<span className="params">(search, value)</span></h2>
              <span className="formula-type-badge">string</span>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>search</td>
                  <td>Required</td>
                  <td>Finds the integer index of [search] in [value]. If [search] is missing in [value] it outputs nothing.</td>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The string that will be manipulated.</td>
                </tr>
              </table>
              <pre>{"FIND('BC', 'ABCD')\n=> 2\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>generate_uuid<span className="params">()</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a UUID (Universally Unique Identifier).</p>
              <pre>{"GENERATE_UUID()\n=> \"518e8221-a29e-72c1-a716-486156481234\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>left<span className="params">(value, length)</span></h2>
              <span className="formula-type-badge">string</span>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The string that will be manipulated.</td>
                </tr>
                <tr>
                  <td>length</td>
                  <td>Required</td>
                  <td>The number of characters to extract starting from the left.</td>
                </tr>
              </table>
              <pre>{"LEFT('ABCD', 2)\n=> \"AB\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>len<span className="params">(value, length)</span></h2>
              <span className="formula-type-badge">string</span>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The string that will be manipulated.</td>
                </tr>
                <tr>
                  <td>length</td>
                  <td>Required</td>
                  <td>Outputs the length of the string as an integer.</td>
                </tr>
              </table>
              <pre>{"LEN('ABCD')\n=> 4\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>oauth_access_token<span className="params">(oauth_connection_key)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns an Access Token for an OAuth Connection.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>oauth_connection_key</td>
                  <td>Required</td>
                  <td>The key that you chose when creating the connection.</td>
                </tr>
              </table>
              <pre>{"OAUTH_ACCESS_TOKEN('marchex_v2')\n=> \"sdjf9032fj239fj90sjf90wjf390\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>right<span className="params">(value, length)</span></h2>
              <span className="formula-type-badge">string</span>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The string that will be manipulated.</td>
                </tr>
                <tr>
                  <td>length</td>
                  <td>Required</td>
                  <td>The number of characters to extract starting from the right.</td>
                </tr>
              </table>
              <pre>{"RIGHT('ABCD', 2)\n=> \"CD\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>seconds_to_hms<span className="params">(seconds)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver formatted as HH:MM:SS</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>seconds</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"SECONDS_TO_HMS(3672)\n=> \"01:01:12\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>split<span className="params">(value, pattern, index)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Divides value into substrings based on a delimiter, returning the substring at index.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The text that will be modified.</td>
                </tr>
                <tr>
                  <td>pattern</td>
                  <td>Required</td>
                  <td>The pattern is a String. Its contents are used as the delimiter when splitting str. If pattern is a single space, str is split on whitespace, with leading and trailing whitespace and runs of contiguous whitespace characters ignored.</td>
                </tr>
                <tr>
                  <td>index</td>
                  <td>Required</td>
                  <td>
                    Index is the index of the split substrings that will be returned. Examples:
                    <br />
                    <br />
                    {" "}
                    <code>
                      {" "}SPLIT([full_name], ' ', 2) would return "Smith"
                      <br />
                      {" "}SPLIT("John Andrew Smith", ' ', 0) would return "John"
                      <br />
                      {" "}SPLIT("John Andrew Smith", ' ', 1) would return "Andrew"
                      <br />
                      {" "}SPLIT("2019-01-12", '-', 1) would return "01"
                    </code>
                  </td>
                </tr>
              </table>
              <pre>{"SPLIT(\"John Smith\", \" \", 1)\n=> \"Smith\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>strip<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>
                Returns a copy of the receiver with leading and trailing whitespace removed.
                <br />
                <br />
                {" "}Whitespace is defined as any of the following characters: null, horizontal tab, line feed, vertical tab, form feed, carriage return, space.
              </p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"STRIP(\"    hello world   \")\n=> \"hello world\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>substitute<span className="params">(value, search, replacement)</span></h2>
              <span className="formula-type-badge">string</span>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The string that will be manipulated.</td>
                </tr>
                <tr>
                  <td>search</td>
                  <td>Required</td>
                  <td>The text that will be replaced.</td>
                </tr>
                <tr>
                  <td>replacement</td>
                  <td>Required</td>
                  <td>The replacement text.</td>
                </tr>
              </table>
              <pre>{"SUBSTITUTE('green cat, blue cat, yellow cat', 'cat', 'dog')\n=> \"green dog, blue cat, yellow cat\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>substitute_all<span className="params">(value, search, replacement)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Replace all occurrences of search with replacement in value.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The string that will be manipulated.</td>
                </tr>
                <tr>
                  <td>search</td>
                  <td>Required</td>
                  <td>The text that will be replaced.</td>
                </tr>
                <tr>
                  <td>replacement</td>
                  <td>Required</td>
                  <td>The replacement text.</td>
                </tr>
              </table>
              <pre>{"SUBSTITUTE_ALL(\"green cat, blue cat, yellow cat\", \"cat\", \"dog\")\n=> \"green dog, blue dog, yellow dog\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>substring<span className="params">(value, start, length)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>A substring is a range of characters within an existing string.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The text that will be modified</td>
                </tr>
                <tr>
                  <td>start</td>
                  <td>Required</td>
                  <td>The position where to start the extraction. First character is at index 0.</td>
                </tr>
                <tr>
                  <td>length</td>
                  <td>Required</td>
                  <td>The number of characters to extract. Pass -1 to extract the rest of the string.</td>
                </tr>
              </table>
              <pre>{"SUBSTRING([started_at_offer_time_zone], 0, 9)\n=> \"2020-09-20\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>titleize<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver with the first letter of each word capitalized.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"TITLEIZE(\"  hello world  \")\n=> \"  Hello World  \"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>to_currency<span className="params">(value, symbol)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Converts a numeric value into a properly formatted currency string, including thousands separators and a currency symbol.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td>The numeric amount to be formatted as currency.</td>
                </tr>
                <tr>
                  <td>symbol</td>
                  <td>Optional</td>
                  <td>Optional symbol to represent the currency (e.g., $, €, £). Defaults to $.</td>
                </tr>
              </table>
              <pre>{"TO_CURRENCY(\"1234567.89\")\n=> \"$1,234,567.89\"\n"}</pre>
              <pre>{"TO_CURRENCY(\"1234567.89\", \"€\")\n=> \"€1,234,567.89\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>to_formatted_number<span className="params">(args, **, block)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver as a phone number in the local format.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>args</td>
                  <td>Optional</td>
                  <td />
                </tr>
                <tr>
                  <td>**</td>
                  <td>Optional</td>
                  <td />
                </tr>
                <tr>
                  <td>block</td>
                  <td>Optional</td>
                  <td />
                </tr>
              </table>
              <pre>{"TO_FORMATTED_NUMBER(\" + 1 719-852-2985 \")\n=> \"(719) 522-0377\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>to_integer<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver as an integer.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"TO_INTEGER(' 15.15 ')\n=> 15\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>to_json<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver as a JSON string.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"TO_JSON({example: \"value\"})\n=> {\"example\": \"value\"}\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>to_phone_number<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver as a normalized international phone number.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"TO_PHONE_NUMBER(\" 1 (719) 852 2985 \")\n=> \"+17198522985\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>upcase<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver with all letters converted to uppercase.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"UPCASE(\"Hello World\")\n=> \"HELLO WORLD\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>url_decode<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver with all percent (%) signs followed by two hex digits replaced with the corresponding character.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"URL_DECODE(\"hello%20world%2C%20how%20are%20you%3F\")\n=> \"hello world, how are you?\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>url_encode<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver with all non-alphanumeric characters replaced with a percent (%) sign followed by two hex digits.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"URL_ENCODE(\"hello world, how are you?\")\n=> \"hello%20world%2C%20how%20are%20you%3F\"\n"}</pre>
            </div>
            <div className="formula-doc">
              <h2>usa_zip_code<span className="params">(value)</span></h2>
              <span className="formula-type-badge">string</span>
              <p>Returns a copy of the receiver with only the first 5 digits preserved.</p>
              <table className="table table-bordered table-striped table-sm w-100">
                <tr>
                  <th>Argument</th>
                  <th>Required</th>
                  <th>Info</th>
                </tr>
                <tr>
                  <td>value</td>
                  <td>Required</td>
                  <td />
                </tr>
              </table>
              <pre>{"USA_ZIP_CODE(\"USA 90210 OR\")\n=> \"90210\"\n"}</pre>
            </div>
          </div>
        </div>
      </section>
      <section className="marketing-cta-band">
        <div className="marketing-cta-band__bg" aria-hidden="true"><img alt="" src="/assets/avx-site/img/constellation-light.svg" /></div>
        <div className="container">
          <h2 className="marketing-cta-band__title">Ready to get started?</h2>
          <p className="marketing-cta-band__subtitle">See how Avortyx turns every lead into a routed, tracked and paid call — start free, or book a walkthrough with a specialist.</p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <a href="/sign_up.html" className="btn btn-cta-primary fw-semibold">Sign Up Free</a>
            {" "}
            <a href="/p/contact.html" className="btn btn-cta-outline fw-semibold">Request a Demo</a>
          </div>
        </div>
      </section>
    </main>
  )
}
