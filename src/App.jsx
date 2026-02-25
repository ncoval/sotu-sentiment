import { useState, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, ReferenceArea, Area, AreaChart } from "recharts";

const compounds = [0.926,0.836,0.926,0.8271,0,-0.9623,0.7964,0,0,0.34,0.9067,0.2484,-0.1027,0.8462,0,-0.6908,-0.3182,-0.6249,-0.5267,0,-0.2023,0.2263,0,0.7564,0,0.6369,0,0.4215,0.4939,0,-0.6486,0,0,0.4939,0.3612,0.3182,0,0.25,0,-0.2023,0.5106,0.5267,0.5267,0.8519,0.8225,0.5574,0,0.8885,0.4404,0.4404,0.7964,0.8834,0.0516,-0.1531,-0.8896,0,0.8176,0.5267,0.5849,0,-0.8271,-0.7003,0.5106,0.8819,0.5719,0,0.8591,0.7906,0.2732,-0.0854,0.2023,0.3182,0.5486,-0.0276,-0.5267,0.6652,0.872,0.25,-0.128,-0.3612,0.3612,0.5106,0.541,0.7003,0.2732,0.25,0,0,0.3818,0.7579,0,-.0572,0.4601,0.5267,0.6486,0,0.7506,0.4215,0.6369,0,0.7845,-0.8225,0,-0.5574,-0.6597,-0.7351,0.25,0,-0.296,0,0.7178,0.1027,0.0258,0.7783,0,0.7351,0,-0.5849,0.3612,0,-0.296,-0.6956,0.1531,0,-0.34,0,0.765,0,0.1531,0.4404,0,0.6115,-0.2732,-0.6124,-0.2732,-0.5106,0.2732,0.7184,0.6124,0,0,0,0,0.05,-0.0613,-0.7198,-0.4767,0.3612,-0.5574,0,-0.4019,-0.3788,0.1048,-0.2263,-0.5574,0.4404,0,0.8689,-0.0668,-0.3182,0.3818,-0.7645,0.1154,-0.891,-0.9337,-0.9531,0.4278,-0.8316,0.6249,0.0772,0,-0.7964,0.6908,0.8316,0.673,-0.5641,-0.2732,-0.4404,-0.5574,0,-0.5994,0.25,-0.4843,-0.9259,-0.296,-0.3182,-0.765,-0.7783,0.9413,0.4939,-0.802,-0.34,-0.5574,-0.3291,0.0052,0.8801,0.5423,0.4588,0.807,0.4754,-0.8481,0.2732,-0.6068,0.8555,0.6369,-0.8542,0.5994,-0.8176,-0.8807,-0.9545,0.9042,-0.7269,-0.2944,-0.8779,0.7506,0,-0.8201,0,-0.6608,0.5994,0.6605,0,-0.7845,0.296,0.6335,-0.5267,0.765,-0.5574,-0.5994,-0.5574,0.4215,0,0.9246,-0.7717,0,0,0.9122,0,-0.8748,-0.5994,0.1401,-0.743,-0.017,-0.7878,-0.6705,0.0772,-0.7351,0.0772,-0.3237,-0.775,-0.2732,0.4754,0,0.8922,0.4767,0.6997,0,-0.1027,0,0,0.9274,0.6597,-0.891,-0.4215,0,-0.4323,0.6369,0.4404,-0.5448,-0.2263,-0.7506,-0.8934,0.2382,0.835,0,-0.7964,-0.796,-0.2263,-0.765,0.5106,0.4019,0.5719,0.9062,0,0.1513,0,0.1531,-0.8625,0,0.6808,0.8442,0,0.8271,0];

const sentences = ["Speaker Johnson, Vice President Vance, first lady of the United States...our nation is back: Bigger, better, richer and stronger than ever before.","Less than five months from now...the 250th anniversary of our glorious American independence.","This July 4th...the most incredible and exceptional nation ever to exist on the face of the earth.","And we've seen nothing yet. We're going to do better and better and better.","This is the golden age of America.","When I spoke in this chamber 12 months ago, I had just inherited a nation in crisis...rampant crime at home and wars and chaos all over the world.","...we have achieved a transformation like no one has ever seen before and a turnaround for the ages.","It is, indeed, a turnaround for the ages.","And we will never go back...We're not going back.","Today our border is secure.","Today our border is secure, our spirit is restored, inflation is plummeting...America is respected again.","...we now have the strongest and most secure border in American history, by far.","In the past nine months, zero illegal aliens have been admitted to the United States.","...people that will love our country and will work hard to maintain our country.","Deadly fentanyl across our border is down by a record 56% in one year.","...the murder rate saw its single largest decline in recorded history.","...the lowest number in over 125 years.","The Biden administration...gave us the worst inflation in the history of our country.","...my administration has driven core inflation down to the lowest level in more than five years.","And in the last three months of 2025, it was down to 1.7%.","Gasoline...was, quite honestly, a disaster...","...is now below $2.30 a gallon in most states.","...I even saw $1.85 a gallon for gasoline, the lowest in four years.","...the annual cost of a typical new mortgage is down almost $5,000.","...lower interest rates will solve the Biden-created housing problem.","The stock market has set 53 all-time record highs since the election.","...boosting pensions, 401Ks and retirement accounts.","Everybody is up, way up.","...the last administration got less than $1 trillion in new investment.","In 12 months, I secured commitments for more than $18 trillion.","What a difference a president makes.","A short time ago, we were a dead country. Now we are the hottest country anywhere in the world.","...we have added 70,000 new construction jobs.","American oil production is up by more than 600,000 barrels a day.","...we just received from Venezuela more than 80 million barrels of oil.","American natural gas production is at an all-time high.","Because I kept my promise to drill, baby, drill.","More Americans are working today than at any time in the history of our country.","...100% of all jobs created under my administration have been in the private sector.","We ended DEI in America.","We cut a record number of job-killing regulations...2.4 million Americans off of food stamps.","...the state of our Union is strong.","Our country is winning again.","...we're winning so much that we really don't know what to do about it.","...we're winning too much. We can't take it anymore.","You're going to win big. You're going to win bigger than ever.","They beat a fantastic Canadian team in overtime. [Hockey team recognition]","...the Presidential Medal of Freedom. [For goalie Connor Hellebuyck]","...the 2028 Olympics...in Los Angeles.","Los Angeles is going to be safe, just like Washington, D.C.","...a year to celebrate our country and the heroes who have kept it free.","At age 17, Buddy volunteered to defend America in World War II...","He fought bravely in the famous Battle of Manila.","He was badly wounded and almost killed by enemy machine guns at Luzon.","...he liberated the largest internment camp in the Philippines.","He earned many honors, including a Purple Heart and a Bronze Star...his 100th birthday.","So Buddy, you're a brave man and we salute you.","...the spirit of 1776 has always shone through very brightly.","...floodwaters tore through a girls summer camp in central Texas.","One of the worst things I've ever seen...tragically claiming many, many lives.","...11-year-old Milly Cate...closed her eyes and prayed to God she thought she was going to die.","Those prayers were answered when Coast Guard rescue swimmer Scott Ruskin descended from a helicopter.","...Scott's first ever rescue mission - young guy, but very brave.","...he lifted not just Milly Cate, but 164 others to safety.","Scott and Milly Cate are here together, reunited for the very first time.","I am now awarding you the Legion of Merit for extraordinary heroism.","...every generation of Americans has stepped forward to defend life, liberty and the pursuit of happiness.","...every child has the chance to reach higher and go further.","...government answers to the people, not the powerful.","That is the debt we owe to the heroes who came before us.","That is the promise we must keep to America for our 250th year.","...passing the largest tax cuts in American history...Republicans delivered so beautifully.","All Democrats, every single one of them voted against these massive tax cuts.","They wanted large-scale tax increases to hurt the people instead.","But we held strong.","...no tax on tips, no tax on overtime and no tax on Social Security for our great seniors.","...interest on auto loans tax deductible...only if the car is made in America.","Megan and her husband will take home more than $5,000 extra just for the year.","We're fighting for you, Megan.","...children's brand new Trump Accounts.","Tax free investment accounts for every American child.","...Michael and Susan Dell, who have donated $6.25 billion...for 25 million American children.","That's called the American Dream.","...these young people's accounts could grow to over $100,000 or more by the time they turn 18.","...our country's stunning economic turnaround...were tariffs.","...took in hundreds of billions of dollars to make great deals for our country.","Countries that were ripping us off for decades are now paying us hundreds of billions.","Even the Democrats know it. They just don't want to say it.","...22 Nobel Prize winners in economics...got it totally wrong.","...an unfortunate ruling from the United States Supreme Court.","...the good news is that almost all countries and corporations want to keep the deal.","Congressional action will not be necessary.","...tariffs will substantially replace the modern-day system of income tax.","...we finally have a president who puts America first.","I put America first. I love America.","For decades before I came along, we had the exact opposite.","...everything was stolen and rigged...to drain the wealth out of the productive, hardworking people.","Under Biden and his corrupt partners...the Green New Scam, open borders...they were murderers.","Record-setting inflation that cost the typical family $34,000.","...the same people in this chamber who voted for those disasters suddenly used the word affordability.","You caused that problem. You caused that problem.","They knew their statements were a dirty, rotten lie.","Their policies created the high prices. Our policies are rapidly ending them.","The price of eggs is down 60%.","...chicken, butter, fruit, hotels, automobiles, rent is lower today than when I took office.","And even beef...is starting to come down significantly.","It's like another big tax cut.","...the crushing cost of health care, caused by you.","...big insurance companies have gotten rich.","It was meant for the insurance companies, not for the people.","...give that money directly to the people...better health care at a much lower cost.","...maximum price transparency.","...the Democrats immediately terminated it...doing a very bad thing for the people.","...ending the wildly inflated cost of prescription drugs.","Other presidents tried to do it, but they never could.","They were all talk and no action.","...Americans will now pay the lowest price anywhere in the world for drugs.","...from the highest price in the entire world to the lowest.","That's a big achievement.","...she and her husband have struggled with infertility and they turned to IVF.","Catherine got that same drug for under $500, a reduction of more than $3,500.","Catherine, we are all praying for you and you're going to be a great mom.","...calling on Congress to codify my most-favored nation program into law.","...energy demand from AI data centers could unfairly drive up their electric utility bills.","...the new ratepayer protection pledge.","...they can build their own plant, they're going to produce their own electricity.","...lowering prices of electricity for you and could be very substantial.","...the American dream...has been under attack...home ownership.","She placed bids on 20 homes and lost all to gigantic investment firms...stealing away her American dream.","...I signed executive order to ban large Wall Street investment firms from buying single family homes.","...Congress to make that ban permanent...homes for people, not for corporations.","Corporations are doing just fine.","...easier for Americans to save for retirement.","...we will always protect Social Security and Medicare.","Since I took office, the typical 401(k) balance is up by at least $30,000.","...half of all working Americans still do not have access to a retirement plan.","...give these oft-forgotten American workers access to the same type of retirement plan.","We will match your contribution with up to $1,000 each year.","...members of Congress cannot corruptly profit from using insider information.","Pass the Stop Insider Trading Act without delay.","...Minnesota, where members of the Somali community have pillaged an estimated $19 billion.","...California, Massachusetts, Maine and many other states are even worse.","...corruption that shreds the fabric of a nation.","...the war on fraud to be led by our great Vice President JD Vance.","...large parts of the world where bribery, corruption, and lawlessness are the norm.","Importing these cultures through unrestricted immigration...brings us problems right here.","...the American people who pay the price in higher medical bills, car insurance rates, rent, taxes, and crime.","We will take care of this problem. We are not playing games.","Dalilah Coleman was only five years old...a tractor trailer plowed into her stopped car.","The driver was an illegal alien, let in by Joe Biden...","Doctors said Dalilah would never be able to walk or talk.","But against all odds, she is now in the first grade, learning to walk.","Dalilah, you are a great inspiration.","...illegal aliens do not speak English and cannot read even the most basic road signs.","...the Dalilah law - barring any state from granting commercial driver's licenses to illegal aliens.","...Americans who lost their treasured loved ones to the scourge of illegal immigration.","...the angel moms and families that our government betrayed and our media totally ignored.","...Lizbeth Medina was supposed to perform in her town's Christmas parade, but she never arrived.","Her mother found her lying dead in a bathtub, bleeding profusely after being stabbed 25 times.","Lizbeth's killer was a previously arrested illegal alien who had brutally extinguished the brightest light.","Her heartbroken mother is in the gallery...we're deporting illegal alien criminals at record numbers.","...many in this room not only allowed the border invasion to happen...they would do it all over again.","If they ever got elected, they would open up those borders to the worst criminals.","The only thing standing between Americans and a wide-open border is President Donald J. Trump.","Democrats in this chamber have cut off all funding for the Department of Homeland Security.","They have instituted another Democrat shutdown.","Now they have closed the agency responsible for protecting Americans from terrorists and murderers.","Tonight, I'm demanding the full and immediate restoration of all funding for border security.","...the State of the Union gives Americans the chance to see what their representatives really believe.","The first duty of the American government is to protect American citizens, not illegal aliens.","You should be ashamed of yourself not standing up.","...end deadly sanctuary cities that protect the criminals.","...the Safe America Act, to stop illegal aliens from voting in our sacred American elections.","The cheating is rampant in our elections.","All voters must show voter ID. All voters must show proof of citizenship.","And no more crooked mail-in ballots except for illness, disability, military or travel.","...Congress should unite and enact this common sense, country saving legislation right now.","...the only way they can get elected is to cheat.","They want to cheat, they have cheated...the only way they can get elected is to cheat.","...school officials in Virginia sought to socially transition her to a new gender...hiding it from parents.","...a confused Sage ran away from home.","...a left wing judge refused to return Sage to her parents.","Sage was thrown into an all boys state home and suffered terribly.","But today...Sage is a proud and wonderful young woman with a full ride scholarship.","...no state can be allowed to rip children from their parents' arms and transition them.","We must ban it, and we must ban it immediately.","Nobody stands up, these people are crazy.","Democrats are destroying our country.","But we've stopped it just in the nick of time.","No one cares more about protecting America's youth than our wonderful First Lady.","...she has had an incredible impact championing AI legislation...foster care...","...students and educators in every state have joined the First Lady's efforts.","Tonight, we welcome two young people whose lives reflect the first Lady's impact.","...a tremendous renewal in religion, faith, Christianity and belief in God.","This is especially true among young people.","...Charlie was violently murdered by an assassin. And martyred for his beliefs.","...America is one nation under God.","And we must totally reject political violence of any kind.","We love religion, and we love bringing it back.","Unleashing America's promise requires keeping our communities safe.","...dangerous repeat offenders continue to be released by pro crime Democrat politicians.","...she and her beautiful daughter Iryna fled war-torn Ukraine.","...a deranged monster who had been arrested over a dozen times...viciously slashed a knife through her neck.","No one will ever forget the expression of terror on Iryna's face.","She died instantly. She had escaped a brutal war, only to be slain by a hardened criminal.","...we will ensure justice for your magnificent daughter, Iryna.","...pass tough legislation to ensure violent repeat offenders are put behind bars.","...I deployed our National Guard and federal law enforcement to restore law and order.","Crime in Washington is now at the lowest level ever recorded, murders down close to 100%.","...20-year-old Sarah Beckstrom. [National Guard story]","...she voluntarily extended her service.","...she was ambushed and shot in the head by a terrorist monster from Afghanistan.","He traveled here because he didn't like people wearing our uniform. He was sick, and deranged.","Sarah Beckstrom died in order to defend our Capitol.","Your daughter was a true American patriot and she will be greatly missed.","Staff Sgt. Andrew Wolfe.","The terrorist shot Andrew in the head, and no one thought he could possibly make it.","His mother said, no, Mr. President, he's going to be fine.","She turned out to be right.","With God's help, Andrew has battled back from the edge of death...a miraculous recovery.","My first 10 months, I ended eight wars.","Pakistan and India would have been a nuclear war.","...35 million people would have died if it were not for my involvement.","...Secretary of State Marco Rubio.","Marco got 100% of the votes when he was in confirmation.","You have done a great job, great Secretary of state...the best ever.","Under the cease fire, every single hostage, both living and dead, has been returned home.","Nobody thought it was possible.","We got them all back.","...they were so grieved but they were so happy...they had their boy back.","The mother said sir we have our boy back.","...25,000 soldiers are dying each and every month. [Russia-Ukraine]","A war which would have never happened if I were president.","...I will make peace wherever I can, but I will never hesitate to confront threats.","...Operation Midnight Hammer...obliterated Iran's nuclear weapons program.","...never to allow Iran to obtain a nuclear weapon.","...the regime and its murderous proxies have spread nothing but terrorism and death and hate.","They've killed and maimed thousands of American service members...millions of people.","...missiles that can threaten Europe...working to build missiles that will soon reach the United States.","...they were warned to make no future attempts to rebuild...yet they continue.","They want to make a deal.","My preference is to solve this problem through diplomacy.","But I will never allow the world's No. 1 sponsor of terror to have a nuclear weapon.","No nation should ever doubt America's resolve.","We have the most powerful military on earth.","...approve a trillion-dollar budget.","...peace through strength, that has been very, very effective.","...investing record dollars in the United States Armed Forces.","NATO countries have agreed to pay 5% of GDP for military defense rather than 2%.","Getting that 5% was something which everyone said would never be done.","Everything we send to Ukraine is sent through NATO and they pay us in full.","Every branch of our Armed Forces is setting records for recruitment.","Every service member recently received a warrior dividend of $1,776.","We love our military. We love our law enforcement. We love firemen.","...restoring American security and dominance in the Western Hemisphere.","...I designated these cartels as foreign terrorist organizations...fentanyl as a weapon of mass destruction.","...stopped record amounts of drugs coming into our country.","...elite American warriors carried out one of the most complex, spectacular feats of military competence.","America's Armed Forces overwhelmed all defenses and utterly defeated an enemy...end the reign of Maduro.","...an absolutely colossal victory for the security of the United States.","A bright new beginning for the people of Venezuela.","...unleash extraordinary economic gains...bring new hope to those who have suffered so terribly.","...Enrique...was kidnapped by Maduro's security forces and thrown into the regime's infamous prison.","Alejandro feared she would never see her uncle again.","...they have ordered the closure of that vile prison and released hundreds of political prisoners.","Alejandro, I'm pleased to inform you that your uncle has been released...he is here tonight.","There were many heroes on that January raid. Really great heroes. It was very dangerous.","Chief Warrant Officer Eric Slover planned the mission...the flight lead in the first helicopter.","...enemy machine guns fired from every angle.","Eric was hit, very badly...four agonizing shots, shredding his leg into numerous pieces.","Despite that, Eric maneuvered his helicopter to face the enemy.","He saved the lives of his fellow warriors from a catastrophic crash deep in enemy territory.","Only after safely landing the helicopter...Eric told his copilot to take over.","...the lives of his fellow warriors hinged on Eric's ability to take searing pain.","...Slover is still recovering, but I'm thrilled to say he is here tonight with his wife, Amy.","...our nation's highest military award, the Congressional Medal of Honor.","And 10 of Eric's fellow warriors will also be receiving medals at the White House.","...Navy fighter pilot Royce Williams served in World War II, Korea, Vietnam...220 missions.","In 1952, Royce was in the dogfight of a lifetime.","...ambushed by seven Soviet fighter planes.","...massively outnumbered and outgunned, Royce led the takedown of four enemy jets...263 bullets.","His story was secret for over 50 years.","But tonight, at 100 years old...finally getting the recognition he deserves.","...Captain Royce Williams with his Congressional Medal of Honor.","Two-hundred fifty years is a long time in the life of a nation.","The revolution that began in 1776 has not ended...the flame of liberty and independence still burns.","These first 250 years were just the beginning. The golden age of America is now upon us."];

const categories = ["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"];
const catColors = { "Very Negative": "#dc2626", "Negative": "#f97316", "Neutral": "#a3a3a3", "Positive": "#3b82f6", "Very Positive": "#22c55e" };
const catColorsDim = { "Very Negative": "#dc262640", "Negative": "#f9731640", "Neutral": "#a3a3a340", "Positive": "#3b82f640", "Very Positive": "#22c55e40" };

function getCategory(score) {
  if (score <= -0.4) return "Very Negative";
  if (score <= -0.05) return "Negative";
  if (score <= 0.05) return "Neutral";
  if (score <= 0.4) return "Positive";
  return "Very Positive";
}

function getColor(score) {
  return catColors[getCategory(score)];
}

const dist = { "Very Negative": 71, "Negative": 30, "Neutral": 63, "Positive": 35, "Very Positive": 95 };

const sectionColors = ["#6366f120", "#f59e0b18", "#6366f120", "#f59e0b18", "#6366f120", "#f59e0b18", "#6366f120", "#f59e0b18", "#6366f120", "#f59e0b18"];
const sectionBorderColors = ["#6366f140", "#f59e0b30", "#6366f140", "#f59e0b30", "#6366f140", "#f59e0b30", "#6366f140", "#f59e0b30", "#6366f140", "#f59e0b30"];

const speechSections = [
  { start: 0, end: 5, label: "Opening" },
  { start: 5, end: 40, label: "Economy & Border" },
  { start: 40, end: 55, label: "Winning / Sports" },
  { start: 55, end: 75, label: "Veterans / Heroes" },
  { start: 75, end: 100, label: "Tax Cuts / Tariffs" },
  { start: 100, end: 140, label: "Inflation / Healthcare" },
  { start: 140, end: 200, label: "Immigration / Crime" },
  { start: 200, end: 230, label: "Foreign Policy / Wars" },
  { start: 230, end: 260, label: "Military / Venezuela" },
  { start: 260, end: 294, label: "Medals / Closing" },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", maxWidth: 340, fontSize: 12, color: "#e0e0e0", lineHeight: 1.5 }}>
      <div style={{ fontWeight: 700, color: getColor(d.score), marginBottom: 4 }}>
        #{d.idx} — {getCategory(d.score)} ({d.score > 0 ? "+" : ""}{d.score.toFixed(3)})
      </div>
      {d.section && <div style={{ fontSize: 10, color: "#8b8bcc", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>📌 {d.section}</div>}
      <div style={{ color: "#ccc" }}>{d.text}</div>
    </div>
  );
};

export default function SentimentDashboard() {
  const [hoveredCat, setHoveredCat] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const timelineData = useMemo(() =>
    compounds.map((c, i) => {
      const sec = speechSections.find(s => i >= s.start && i < s.end);
      return { idx: i + 1, score: c, text: sentences[i] || `Sentence ${i+1}`, section: sec ? sec.label : "" };
    }),
  []);

  // Per-section statistics
  const sectionStats = useMemo(() => {
    return speechSections.map(sec => {
      const sectionSentences = timelineData.filter((_, i) => i >= sec.start && i < sec.end);
      const scores = sectionSentences.map(s => s.score);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const sectionDist = {};
      categories.forEach(cat => { sectionDist[cat] = 0; });
      sectionSentences.forEach(s => { sectionDist[getCategory(s.score)]++; });
      return {
        ...sec,
        count: sectionSentences.length,
        avg,
        min: Math.min(...scores),
        max: Math.max(...scores),
        dist: sectionDist,
        sentences: sectionSentences,
      };
    });
  }, [timelineData]);

  const barData = categories.map(cat => ({
    name: cat,
    count: dist[cat],
    pct: ((dist[cat] / 294) * 100).toFixed(1),
    fill: catColors[cat]
  }));

  // Rolling average (window of 10)
  const rollingData = useMemo(() => {
    const window = 10;
    return timelineData.map((d, i) => {
      const start = Math.max(0, i - Math.floor(window / 2));
      const end = Math.min(timelineData.length, i + Math.ceil(window / 2));
      const slice = timelineData.slice(start, end);
      const avg = slice.reduce((s, v) => s + v.score, 0) / slice.length;
      return { ...d, avg: parseFloat(avg.toFixed(4)) };
    });
  }, [timelineData]);

  const posCount = dist["Positive"] + dist["Very Positive"];
  const negCount = dist["Negative"] + dist["Very Negative"];

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: "#0d0d1a", color: "#e8e8f0", minHeight: "100vh", padding: "32px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 40, borderBottom: "1px solid #222", paddingBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: "-0.5px", background: "linear-gradient(135deg, #60a5fa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            2026 State of the Union — Sentiment Analysis
          </h1>
          <p style={{ color: "#888", margin: "8px 0 0", fontSize: 14 }}>
            294 sentences analyzed using VADER sentiment scoring across 5 categories
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
          {[
            { label: "Total Sentences", value: "294", color: "#8b8baa" },
            { label: "Net Positive", value: `${posCount} (${((posCount/294)*100).toFixed(0)}%)`, color: "#22c55e" },
            { label: "Neutral", value: `${dist["Neutral"]} (${((dist["Neutral"]/294)*100).toFixed(0)}%)`, color: "#a3a3a3" },
            { label: "Net Negative", value: `${negCount} (${((negCount/294)*100).toFixed(0)}%)`, color: "#dc2626" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#13132a", borderRadius: 10, padding: "14px 16px", border: "1px solid #1e1e3a" }}>
              <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Distribution Bar Chart */}
        <div style={{ background: "#13132a", borderRadius: 12, padding: "24px", border: "1px solid #1e1e3a", marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px", color: "#c8c8e0" }}>Sentiment Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barSize={60}>
              <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: "#ffffff08" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div style={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#e0e0e0" }}>
                      <span style={{ fontWeight: 700, color: d.fill }}>{d.name}</span>: {d.count} sentences ({d.pct}%)
                    </div>
                  );
                }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline */}
        <div style={{ background: "#13132a", borderRadius: 12, padding: "24px", border: "1px solid #1e1e3a", marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px", color: "#c8c8e0" }}>Sentiment Flow Through the Speech</h2>
          <p style={{ fontSize: 12, color: "#666", margin: "0 0 16px" }}>Each dot = one sentence. Line = 10-sentence rolling average. Hover for details.</p>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={rollingData} margin={{ top: 30, right: 10, bottom: 20, left: 10 }}>
              <defs>
                <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="negGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              {speechSections.map((s, i) => (
                <ReferenceArea
                  key={`section-${i}`}
                  x1={s.start + 1}
                  x2={s.end}
                  y1={-1}
                  y2={1}
                  fill={sectionColors[i]}
                  stroke={sectionBorderColors[i]}
                  strokeDasharray="3 3"
                  label={{
                    value: s.label,
                    position: "insideTop",
                    fill: i % 2 === 0 ? "#8b8bcc" : "#c4a35a",
                    fontSize: 9,
                    fontWeight: 600,
                    offset: 6,
                  }}
                />
              ))}
              <XAxis dataKey="idx" tick={{ fill: "#555", fontSize: 10 }} axisLine={{ stroke: "#333" }} tickLine={false} label={{ value: "Sentence #", position: "insideBottom", offset: -10, fill: "#666", fontSize: 11 }} />
              <YAxis domain={[-1, 1]} tick={{ fill: "#555", fontSize: 10 }} axisLine={{ stroke: "#333" }} tickLine={false} ticks={[-1, -0.5, 0, 0.5, 1]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={0} stroke="#444" strokeDasharray="4 4" />
              <ReferenceLine y={0.4} stroke="#22c55e22" strokeDasharray="2 4" />
              <ReferenceLine y={-0.4} stroke="#dc262622" strokeDasharray="2 4" />
              <Area type="monotone" dataKey="avg" stroke="none" fill="url(#posGrad)" baseValue={0} connectNulls />
              <Line type="monotone" dataKey="score" stroke="none" dot={(props) => {
                const { cx, cy, payload } = props;
                return <circle cx={cx} cy={cy} r={2.5} fill={getColor(payload.score)} fillOpacity={0.7} />;
              }} activeDot={{ r: 5, stroke: "#fff", strokeWidth: 1 }} />
              <Line type="monotone" dataKey="avg" stroke="#60a5fa" strokeWidth={2.5} dot={false} strokeOpacity={0.9} />
            </AreaChart>
          </ResponsiveContainer>

        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
          {categories.map(cat => (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#aaa" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: catColors[cat] }} />
              {cat}
            </div>
          ))}
        </div>

        {/* Section-by-Section Breakdown */}
        <div style={{ background: "#13132a", borderRadius: 12, padding: "24px", border: "1px solid #1e1e3a", marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px", color: "#c8c8e0" }}>Section-by-Section Breakdown</h2>
          <p style={{ fontSize: 12, color: "#666", margin: "0 0 20px" }}>Compare sentiment across each major section of the speech. Click to expand details.</p>

          {/* Summary comparison bar */}
          <div style={{ marginBottom: 24 }}>
            {sectionStats.map((sec, i) => {
              const avgColor = sec.avg > 0.15 ? "#22c55e" : sec.avg < -0.15 ? "#dc2626" : sec.avg < 0 ? "#f97316" : "#3b82f6";
              const barWidth = Math.abs(sec.avg) * 100;
              const isExpanded = expandedSection === i;
              return (
                <div key={i} style={{ marginBottom: 2 }}>
                  <div
                    onClick={() => setExpandedSection(isExpanded ? null : i)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "180px 60px 1fr 50px",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 14px",
                      background: isExpanded ? "#1a1a3a" : i % 2 === 0 ? "#13132a" : "#15152e",
                      borderRadius: 6,
                      cursor: "pointer",
                      border: isExpanded ? "1px solid #333" : "1px solid transparent",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {/* Section name */}
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#d0d0e8" }}>
                      <span style={{ color: "#666", fontSize: 10, marginRight: 6 }}>#{sec.start + 1}–{sec.end}</span>
                      {sec.label}
                    </div>

                    {/* Average score */}
                    <div style={{ fontSize: 13, fontWeight: 700, color: avgColor, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                      {sec.avg > 0 ? "+" : ""}{sec.avg.toFixed(2)}
                    </div>

                    {/* Stacked sentiment bar */}
                    <div style={{ display: "flex", height: 20, borderRadius: 4, overflow: "hidden", background: "#0d0d1a" }}>
                      {categories.map((cat) => {
                        const count = sec.dist[cat] || 0;
                        const pct = (count / sec.count) * 100;
                        if (pct === 0) return null;
                        return (
                          <div
                            key={cat}
                            title={`${cat}: ${count} (${pct.toFixed(0)}%)`}
                            style={{
                              width: `${pct}%`,
                              background: catColors[cat],
                              opacity: 0.85,
                              minWidth: count > 0 ? 3 : 0,
                              transition: "width 0.3s ease",
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Expand indicator */}
                    <div style={{ fontSize: 11, color: "#555", textAlign: "right" }}>
                      {sec.count} sent. {isExpanded ? "▲" : "▼"}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isExpanded && (
                    <div style={{ padding: "16px 14px", background: "#111128", borderRadius: "0 0 8px 8px", borderTop: "none" }}>
                      {/* Stats row */}
                      <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
                        {categories.map(cat => {
                          const count = sec.dist[cat] || 0;
                          const pct = ((count / sec.count) * 100).toFixed(0);
                          return (
                            <div key={cat} style={{ fontSize: 11, color: "#999" }}>
                              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: catColors[cat], marginRight: 4, verticalAlign: "middle" }} />
                              {cat}: <span style={{ color: catColors[cat], fontWeight: 600 }}>{count}</span> ({pct}%)
                            </div>
                          );
                        })}
                        <div style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>
                          Range: <span style={{ color: "#dc2626" }}>{sec.min.toFixed(2)}</span> to <span style={{ color: "#22c55e" }}>+{sec.max.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Mini sparkline for this section */}
                      <ResponsiveContainer width="100%" height={140}>
                        <AreaChart data={sec.sentences} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                          <defs>
                            <linearGradient id={`secGradPos${i}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id={`secGradNeg${i}`} x1="0" y1="1" x2="0" y2="0">
                              <stop offset="0%" stopColor="#dc2626" stopOpacity={0.4} />
                              <stop offset="100%" stopColor="#dc2626" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="idx" tick={{ fill: "#444", fontSize: 9 }} axisLine={{ stroke: "#222" }} tickLine={false} />
                          <YAxis domain={[-1, 1]} tick={{ fill: "#444", fontSize: 9 }} axisLine={{ stroke: "#222" }} tickLine={false} ticks={[-1, 0, 1]} width={25} />
                          <Tooltip content={<CustomTooltip />} />
                          <ReferenceLine y={0} stroke="#333" strokeDasharray="3 3" />
                          <Area type="monotone" dataKey="score" stroke="none" fill="url(#posGrad)" baseValue={0} />
                          <Line type="monotone" dataKey="score" stroke="none" dot={(props) => {
                            const { cx, cy, payload } = props;
                            return <circle cx={cx} cy={cy} r={3.5} fill={getColor(payload.score)} fillOpacity={0.85} stroke={getColor(payload.score)} strokeWidth={0.5} />;
                          }} activeDot={{ r: 6, stroke: "#fff", strokeWidth: 1.5 }} />
                          <Line type="monotone" dataKey="score" stroke="#60a5fa" strokeWidth={1.5} dot={false} strokeOpacity={0.4} />
                        </AreaChart>
                      </ResponsiveContainer>

                      {/* Most extreme sentences in this section */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                        <div>
                          <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Most Positive</div>
                          {sec.sentences.filter(s => s.score > 0).sort((a,b) => b.score - a.score).slice(0, 2).map((s, j) => (
                            <div key={j} style={{ fontSize: 10, color: "#888", lineHeight: 1.4, marginBottom: 4, borderLeft: "2px solid #22c55e30", paddingLeft: 6 }}>
                              <span style={{ color: "#22c55e", fontWeight: 700 }}>+{s.score.toFixed(3)}</span> {s.text}
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#dc2626", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Most Negative</div>
                          {sec.sentences.filter(s => s.score < 0).sort((a,b) => a.score - b.score).slice(0, 2).map((s, j) => (
                            <div key={j} style={{ fontSize: 10, color: "#888", lineHeight: 1.4, marginBottom: 4, borderLeft: "2px solid #dc262630", paddingLeft: 6 }}>
                              <span style={{ color: "#dc2626", fontWeight: 700 }}>{s.score.toFixed(3)}</span> {s.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Extremes */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "#13132a", borderRadius: 12, padding: 20, border: "1px solid #1e1e3a" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#22c55e", margin: "0 0 12px" }}>🟢 Most Positive Sentences</h3>
            {[...timelineData].sort((a,b) => b.score - a.score).slice(0, 5).map((d, i) => (
              <div key={i} style={{ fontSize: 11, color: "#aaa", marginBottom: 8, lineHeight: 1.5, borderLeft: "2px solid #22c55e30", paddingLeft: 8 }}>
                <span style={{ color: "#22c55e", fontWeight: 700 }}>+{d.score.toFixed(3)}</span> #{d.idx}: {d.text}
              </div>
            ))}
          </div>
          <div style={{ background: "#13132a", borderRadius: 12, padding: 20, border: "1px solid #1e1e3a" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", margin: "0 0 12px" }}>🔴 Most Negative Sentences</h3>
            {[...timelineData].sort((a,b) => a.score - b.score).slice(0, 5).map((d, i) => (
              <div key={i} style={{ fontSize: 11, color: "#aaa", marginBottom: 8, lineHeight: 1.5, borderLeft: "2px solid #dc262630", paddingLeft: 8 }}>
                <span style={{ color: "#dc2626", fontWeight: 700 }}>{d.score.toFixed(3)}</span> #{d.idx}: {d.text}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", color: "#444", fontSize: 11, paddingTop: 8 }}>
          Analysis performed using VADER (Valence Aware Dictionary and sEntiment Reasoner) · Scores range from -1 (most negative) to +1 (most positive)
        </div>
      </div>
    </div>
  );
}
