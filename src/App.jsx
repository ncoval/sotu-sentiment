import { useState, useMemo, useEffect, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  ReferenceLine, ReferenceArea, Area, AreaChart, Line, PieChart, Pie,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

/* ═══════════════════════════════════════════
   SENTIMENT DATA
   ═══════════════════════════════════════════ */
const compounds=[0.926,0.836,0.926,0.8271,0,-0.9623,0.7964,0,0,0.34,0.9067,0.2484,-0.1027,0.8462,0,-0.6908,-0.3182,-0.6249,-0.5267,0,-0.2023,0.2263,0,0.7564,0,0.6369,0,0.4215,0.4939,0,-0.6486,0,0,0.4939,0.3612,0.3182,0,0.25,0,-0.2023,0.5106,0.5267,0.5267,0.8519,0.8225,0.5574,0,0.8885,0.4404,0.4404,0.7964,0.8834,0.0516,-0.1531,-0.8896,0,0.8176,0.5267,0.5849,0,-0.8271,-0.7003,0.5106,0.8819,0.5719,0,0.8591,0.7906,0.2732,-0.0854,0.2023,0.3182,0.5486,-0.0276,-0.5267,0.6652,0.872,0.25,-0.128,-0.3612,0.3612,0.5106,0.541,0.7003,0.2732,0.25,0,0,0.3818,0.7579,0,-.0572,0.4601,0.5267,0.6486,0,0.7506,0.4215,0.6369,0,0.7845,-0.8225,0,-0.5574,-0.6597,-0.7351,0.25,0,-0.296,0,0.7178,0.1027,0.0258,0.7783,0,0.7351,0,-0.5849,0.3612,0,-0.296,-0.6956,0.1531,0,-0.34,0,0.765,0,0.1531,0.4404,0,0.6115,-0.2732,-0.6124,-0.2732,-0.5106,0.2732,0.7184,0.6124,0,0,0,0,0.05,-0.0613,-0.7198,-0.4767,0.3612,-0.5574,0,-0.4019,-0.3788,0.1048,-0.2263,-0.5574,0.4404,0,0.8689,-0.0668,-0.3182,0.3818,-0.7645,0.1154,-0.891,-0.9337,-0.9531,0.4278,-0.8316,0.6249,0.0772,0,-0.7964,0.6908,0.8316,0.673,-0.5641,-0.2732,-0.4404,-0.5574,0,-0.5994,0.25,-0.4843,-0.9259,-0.296,-0.3182,-0.765,-0.7783,0.9413,0.4939,-0.802,-0.34,-0.5574,-0.3291,0.0052,0.8801,0.5423,0.4588,0.807,0.4754,-0.8481,0.2732,-0.6068,0.8555,0.6369,-0.8542,0.5994,-0.8176,-0.8807,-0.9545,0.9042,-0.7269,-0.2944,-0.8779,0.7506,0,-0.8201,0,-0.6608,0.5994,0.6605,0,-0.7845,0.296,0.6335,-0.5267,0.765,-0.5574,-0.5994,-0.5574,0.4215,0,0.9246,-0.7717,0,0,0.9122,0,-0.8748,-0.5994,0.1401,-0.743,-0.017,-0.7878,-0.6705,0.0772,-0.7351,0.0772,-0.3237,-0.775,-0.2732,0.4754,0,0.8922,0.4767,0.6997,0,-0.1027,0,0,0.9274,0.6597,-0.891,-0.4215,0,-0.4323,0.6369,0.4404,-0.5448,-0.2263,-0.7506,-0.8934,0.2382,0.835,0,-0.7964,-0.796,-0.2263,-0.765,0.5106,0.4019,0.5719,0.9062,0,0.1513,0,0.1531,-0.8625,0,0.6808,0.8442,0,0.8271,0];

const sentences=["Speaker Johnson, Vice President Vance, first lady of the United States...our nation is back: Bigger, better, richer and stronger than ever before.","Less than five months from now...the 250th anniversary of our glorious American independence.","This July 4th...the most incredible and exceptional nation ever to exist on the face of the earth.","And we've seen nothing yet. We're going to do better and better and better.","This is the golden age of America.","When I spoke in this chamber 12 months ago, I had just inherited a nation in crisis...rampant crime at home and wars and chaos all over the world.","...we have achieved a transformation like no one has ever seen before and a turnaround for the ages.","It is, indeed, a turnaround for the ages.","And we will never go back...We're not going back.","Today our border is secure.","Today our border is secure, our spirit is restored, inflation is plummeting...America is respected again.","...we now have the strongest and most secure border in American history, by far.","In the past nine months, zero illegal aliens have been admitted to the United States.","...people that will love our country and will work hard to maintain our country.","Deadly fentanyl across our border is down by a record 56% in one year.","...the murder rate saw its single largest decline in recorded history.","...the lowest number in over 125 years.","The Biden administration...gave us the worst inflation in the history of our country.","...my administration has driven core inflation down to the lowest level in more than five years.","And in the last three months of 2025, it was down to 1.7%.","Gasoline...was, quite honestly, a disaster...","...is now below $2.30 a gallon in most states.","...I even saw $1.85 a gallon for gasoline, the lowest in four years.","...the annual cost of a typical new mortgage is down almost $5,000.","...lower interest rates will solve the Biden-created housing problem.","The stock market has set 53 all-time record highs since the election.","...boosting pensions, 401Ks and retirement accounts.","Everybody is up, way up.","...the last administration got less than $1 trillion in new investment.","In 12 months, I secured commitments for more than $18 trillion.","What a difference a president makes.","A short time ago, we were a dead country. Now we are the hottest country anywhere in the world.","...we have added 70,000 new construction jobs.","American oil production is up by more than 600,000 barrels a day.","...we just received from Venezuela more than 80 million barrels of oil.","American natural gas production is at an all-time high.","Because I kept my promise to drill, baby, drill.","More Americans are working today than at any time in the history of our country.","...100% of all jobs created under my administration have been in the private sector.","We ended DEI in America.","We cut a record number of job-killing regulations...2.4 million Americans off of food stamps.","...the state of our Union is strong.","Our country is winning again.","...we're winning so much that we really don't know what to do about it.","...we're winning too much. We can't take it anymore.","You're going to win big. You're going to win bigger than ever.","They beat a fantastic Canadian team in overtime.","...the Presidential Medal of Freedom.","...the 2028 Olympics...in Los Angeles.","Los Angeles is going to be safe, just like Washington, D.C.","...a year to celebrate our country and the heroes who have kept it free.","At age 17, Buddy volunteered to defend America in World War II...","He fought bravely in the famous Battle of Manila.","He was badly wounded and almost killed by enemy machine guns at Luzon.","...he liberated the largest internment camp in the Philippines.","He earned many honors, including a Purple Heart and a Bronze Star...his 100th birthday.","So Buddy, you're a brave man and we salute you.","...the spirit of 1776 has always shone through very brightly.","...floodwaters tore through a girls summer camp in central Texas.","One of the worst things I've ever seen...tragically claiming many, many lives.","...11-year-old Milly Cate...closed her eyes and prayed to God she thought she was going to die.","Those prayers were answered when Coast Guard rescue swimmer Scott Ruskin descended from a helicopter.","...Scott's first ever rescue mission - young guy, but very brave.","...he lifted not just Milly Cate, but 164 others to safety.","Scott and Milly Cate are here together, reunited for the very first time.","I am now awarding you the Legion of Merit for extraordinary heroism.","...every generation of Americans has stepped forward to defend life, liberty and the pursuit of happiness.","...every child has the chance to reach higher and go further.","...government answers to the people, not the powerful.","That is the debt we owe to the heroes who came before us.","That is the promise we must keep to America for our 250th year.","...passing the largest tax cuts in American history...Republicans delivered so beautifully.","All Democrats, every single one of them voted against these massive tax cuts.","They wanted large-scale tax increases to hurt the people instead.","But we held strong.","...no tax on tips, no tax on overtime and no tax on Social Security for our great seniors.","...interest on auto loans tax deductible...only if the car is made in America.","Megan and her husband will take home more than $5,000 extra just for the year.","We're fighting for you, Megan.","...children's brand new Trump Accounts.","Tax free investment accounts for every American child.","...Michael and Susan Dell, who have donated $6.25 billion...for 25 million American children.","That's called the American Dream.","...these young people's accounts could grow to over $100,000 or more by the time they turn 18.","...our country's stunning economic turnaround...were tariffs.","...took in hundreds of billions of dollars to make great deals for our country.","Countries that were ripping us off for decades are now paying us hundreds of billions.","Even the Democrats know it. They just don't want to say it.","...22 Nobel Prize winners in economics...got it totally wrong.","...an unfortunate ruling from the United States Supreme Court.","...the good news is that almost all countries and corporations want to keep the deal.","Congressional action will not be necessary.","...tariffs will substantially replace the modern-day system of income tax.","...we finally have a president who puts America first.","I put America first. I love America.","For decades before I came along, we had the exact opposite.","...everything was stolen and rigged...to drain the wealth out of the productive, hardworking people.","Under Biden and his corrupt partners...the Green New Scam, open borders...they were murderers.","Record-setting inflation that cost the typical family $34,000.","...the same people in this chamber who voted for those disasters suddenly used the word affordability.","You caused that problem. You caused that problem.","They knew their statements were a dirty, rotten lie.","Their policies created the high prices. Our policies are rapidly ending them.","The price of eggs is down 60%.","...chicken, butter, fruit, hotels, automobiles, rent is lower today than when I took office.","And even beef...is starting to come down significantly.","It's like another big tax cut.","...the crushing cost of health care, caused by you.","...big insurance companies have gotten rich.","It was meant for the insurance companies, not for the people.","...give that money directly to the people...better health care at a much lower cost.","...maximum price transparency.","...the Democrats immediately terminated it...doing a very bad thing for the people.","...ending the wildly inflated cost of prescription drugs.","Other presidents tried to do it, but they never could.","They were all talk and no action.","...Americans will now pay the lowest price anywhere in the world for drugs.","...from the highest price in the entire world to the lowest.","That's a big achievement.","...she and her husband have struggled with infertility and they turned to IVF.","Catherine got that same drug for under $500, a reduction of more than $3,500.","Catherine, we are all praying for you and you're going to be a great mom.","...calling on Congress to codify my most-favored nation program into law.","...energy demand from AI data centers could unfairly drive up their electric utility bills.","...the new ratepayer protection pledge.","...they can build their own plant, they're going to produce their own electricity.","...lowering prices of electricity for you and could be very substantial.","...the American dream...has been under attack...home ownership.","She placed bids on 20 homes and lost all to gigantic investment firms...stealing away her American dream.","...I signed executive order to ban large Wall Street investment firms from buying single family homes.","...Congress to make that ban permanent...homes for people, not for corporations.","Corporations are doing just fine.","...easier for Americans to save for retirement.","...we will always protect Social Security and Medicare.","Since I took office, the typical 401(k) balance is up by at least $30,000.","...half of all working Americans still do not have access to a retirement plan.","...give these oft-forgotten American workers access to the same type of retirement plan.","We will match your contribution with up to $1,000 each year.","...members of Congress cannot corruptly profit from using insider information.","Pass the Stop Insider Trading Act without delay.","...Minnesota, where members of the Somali community have pillaged an estimated $19 billion.","...California, Massachusetts, Maine and many other states are even worse.","...corruption that shreds the fabric of a nation.","...the war on fraud to be led by our great Vice President JD Vance.","...large parts of the world where bribery, corruption, and lawlessness are the norm.","Importing these cultures through unrestricted immigration...brings us problems right here.","...the American people who pay the price in higher medical bills, car insurance rates, rent, taxes, and crime.","We will take care of this problem. We are not playing games.","Dalilah Coleman was only five years old...a tractor trailer plowed into her stopped car.","The driver was an illegal alien, let in by Joe Biden...","Doctors said Dalilah would never be able to walk or talk.","But against all odds, she is now in the first grade, learning to walk.","Dalilah, you are a great inspiration.","...illegal aliens do not speak English and cannot read even the most basic road signs.","...the Dalilah law - barring any state from granting commercial driver's licenses to illegal aliens.","...Americans who lost their treasured loved ones to the scourge of illegal immigration.","...the angel moms and families that our government betrayed and our media totally ignored.","...Lizbeth Medina was supposed to perform in her town's Christmas parade, but she never arrived.","Her mother found her lying dead in a bathtub, bleeding profusely after being stabbed 25 times.","Lizbeth's killer was a previously arrested illegal alien who had brutally extinguished the brightest light.","Her heartbroken mother is in the gallery...we're deporting illegal alien criminals at record numbers.","...many in this room not only allowed the border invasion to happen...they would do it all over again.","If they ever got elected, they would open up those borders to the worst criminals.","The only thing standing between Americans and a wide-open border is President Donald J. Trump.","Democrats in this chamber have cut off all funding for the Department of Homeland Security.","They have instituted another Democrat shutdown.","Now they have closed the agency responsible for protecting Americans from terrorists and murderers.","Tonight, I'm demanding the full and immediate restoration of all funding for border security.","...the State of the Union gives Americans the chance to see what their representatives really believe.","The first duty of the American government is to protect American citizens, not illegal aliens.","You should be ashamed of yourself not standing up.","...end deadly sanctuary cities that protect the criminals.","...the Safe America Act, to stop illegal aliens from voting in our sacred American elections.","The cheating is rampant in our elections.","All voters must show voter ID. All voters must show proof of citizenship.","And no more crooked mail-in ballots except for illness, disability, military or travel.","...Congress should unite and enact this common sense, country saving legislation right now.","...the only way they can get elected is to cheat.","They want to cheat, they have cheated...the only way they can get elected is to cheat.","...school officials in Virginia sought to socially transition her to a new gender...hiding it from parents.","...a confused Sage ran away from home.","...a left wing judge refused to return Sage to her parents.","Sage was thrown into an all boys state home and suffered terribly.","But today...Sage is a proud and wonderful young woman with a full ride scholarship.","...no state can be allowed to rip children from their parents' arms and transition them.","We must ban it, and we must ban it immediately.","Nobody stands up, these people are crazy.","Democrats are destroying our country.","But we've stopped it just in the nick of time.","No one cares more about protecting America's youth than our wonderful First Lady.","...she has had an incredible impact championing AI legislation...foster care...","...students and educators in every state have joined the First Lady's efforts.","Tonight, we welcome two young people whose lives reflect the first Lady's impact.","...a tremendous renewal in religion, faith, Christianity and belief in God.","This is especially true among young people.","...Charlie was violently murdered by an assassin. And martyred for his beliefs.","...America is one nation under God.","And we must totally reject political violence of any kind.","We love religion, and we love bringing it back.","Unleashing America's promise requires keeping our communities safe.","...dangerous repeat offenders continue to be released by pro crime Democrat politicians.","...she and her beautiful daughter Iryna fled war-torn Ukraine.","...a deranged monster who had been arrested over a dozen times...viciously slashed a knife through her neck.","No one will ever forget the expression of terror on Iryna's face.","She died instantly. She had escaped a brutal war, only to be slain by a hardened criminal.","...we will ensure justice for your magnificent daughter, Iryna.","...pass tough legislation to ensure violent repeat offenders are put behind bars.","...I deployed our National Guard and federal law enforcement to restore law and order.","Crime in Washington is now at the lowest level ever recorded, murders down close to 100%.","...20-year-old Sarah Beckstrom.","...she voluntarily extended her service.","...she was ambushed and shot in the head by a terrorist monster from Afghanistan.","He traveled here because he didn't like people wearing our uniform. He was sick, and deranged.","Sarah Beckstrom died in order to defend our Capitol.","Your daughter was a true American patriot and she will be greatly missed.","Staff Sgt. Andrew Wolfe.","The terrorist shot Andrew in the head, and no one thought he could possibly make it.","His mother said, no, Mr. President, he's going to be fine.","She turned out to be right.","With God's help, Andrew has battled back from the edge of death...a miraculous recovery.","My first 10 months, I ended eight wars.","Pakistan and India would have been a nuclear war.","...35 million people would have died if it were not for my involvement.","...Secretary of State Marco Rubio.","Marco got 100% of the votes when he was in confirmation.","You have done a great job, great Secretary of state...the best ever.","Under the cease fire, every single hostage, both living and dead, has been returned home.","Nobody thought it was possible.","We got them all back.","...they were so grieved but they were so happy...they had their boy back.","The mother said sir we have our boy back.","...25,000 soldiers are dying each and every month.","A war which would have never happened if I were president.","...I will make peace wherever I can, but I will never hesitate to confront threats.","...Operation Midnight Hammer...obliterated Iran's nuclear weapons program.","...never to allow Iran to obtain a nuclear weapon.","...the regime and its murderous proxies have spread nothing but terrorism and death and hate.","They've killed and maimed thousands of American service members...millions of people.","...missiles that can threaten Europe...working to build missiles that will soon reach the United States.","...they were warned to make no future attempts to rebuild...yet they continue.","They want to make a deal.","My preference is to solve this problem through diplomacy.","But I will never allow the world's No. 1 sponsor of terror to have a nuclear weapon.","No nation should ever doubt America's resolve.","We have the most powerful military on earth.","...approve a trillion-dollar budget.","...peace through strength, that has been very, very effective.","...investing record dollars in the United States Armed Forces.","NATO countries have agreed to pay 5% of GDP for military defense rather than 2%.","Getting that 5% was something which everyone said would never be done.","Everything we send to Ukraine is sent through NATO and they pay us in full.","Every branch of our Armed Forces is setting records for recruitment.","Every service member recently received a warrior dividend of $1,776.","We love our military. We love our law enforcement. We love firemen.","...restoring American security and dominance in the Western Hemisphere.","...I designated these cartels as foreign terrorist organizations...fentanyl as a weapon of mass destruction.","...stopped record amounts of drugs coming into our country.","...elite American warriors carried out one of the most complex, spectacular feats of military competence.","America's Armed Forces overwhelmed all defenses and utterly defeated an enemy...end the reign of Maduro.","...an absolutely colossal victory for the security of the United States.","A bright new beginning for the people of Venezuela.","...unleash extraordinary economic gains...bring new hope to those who have suffered so terribly.","...Enrique...was kidnapped by Maduro's security forces and thrown into the regime's infamous prison.","Alejandro feared she would never see her uncle again.","...they have ordered the closure of that vile prison and released hundreds of political prisoners.","Alejandro, I'm pleased to inform you that your uncle has been released...he is here tonight.","There were many heroes on that January raid. Really great heroes. It was very dangerous.","Chief Warrant Officer Eric Slover planned the mission...the flight lead in the first helicopter.","...enemy machine guns fired from every angle.","Eric was hit, very badly...four agonizing shots, shredding his leg into numerous pieces.","Despite that, Eric maneuvered his helicopter to face the enemy.","He saved the lives of his fellow warriors from a catastrophic crash deep in enemy territory.","Only after safely landing the helicopter...Eric told his copilot to take over.","...the lives of his fellow warriors hinged on Eric's ability to take searing pain.","...Slover is still recovering, but I'm thrilled to say he is here tonight with his wife, Amy.","...our nation's highest military award, the Congressional Medal of Honor.","And 10 of Eric's fellow warriors will also be receiving medals at the White House.","...Navy fighter pilot Royce Williams served in World War II, Korea, Vietnam...220 missions.","In 1952, Royce was in the dogfight of a lifetime.","...ambushed by seven Soviet fighter planes.","...massively outnumbered and outgunned, Royce led the takedown of four enemy jets...263 bullets.","His story was secret for over 50 years.","But tonight, at 100 years old...finally getting the recognition he deserves.","...Captain Royce Williams with his Congressional Medal of Honor.","Two-hundred fifty years is a long time in the life of a nation.","The revolution that began in 1776 has not ended...the flame of liberty and independence still burns.","These first 250 years were just the beginning. The golden age of America is now upon us."];

const sentCategories = ["Very Negative","Negative","Neutral","Positive","Very Positive"];
const catColors = {"Very Negative":"#dc2626","Negative":"#f97316","Neutral":"#a3a3a3","Positive":"#3b82f6","Very Positive":"#22c55e"};
function getCategory(s){if(s<=-0.4)return"Very Negative";if(s<=-0.05)return"Negative";if(s<=0.05)return"Neutral";if(s<=0.4)return"Positive";return"Very Positive";}
function getColor(s){return catColors[getCategory(s)];}
const dist={"Very Negative":71,"Negative":30,"Neutral":63,"Positive":35,"Very Positive":95};
const sectionColors=["#6366f120","#f59e0b18","#6366f120","#f59e0b18","#6366f120","#f59e0b18","#6366f120","#f59e0b18","#6366f120","#f59e0b18"];
const sectionBorderColors=["#6366f140","#f59e0b30","#6366f140","#f59e0b30","#6366f140","#f59e0b30","#6366f140","#f59e0b30","#6366f140","#f59e0b30"];
const speechSections=[{start:0,end:5,label:"Opening"},{start:5,end:40,label:"Economy & Border"},{start:40,end:55,label:"Winning / Sports"},{start:55,end:75,label:"Veterans / Heroes"},{start:75,end:100,label:"Tax Cuts / Tariffs"},{start:100,end:140,label:"Inflation / Healthcare"},{start:140,end:200,label:"Immigration / Crime"},{start:200,end:230,label:"Foreign Policy / Wars"},{start:230,end:260,label:"Military / Venezuela"},{start:260,end:294,label:"Medals / Closing"}];

/* ═══════════════════════════════════════════
   FACT CHECK DATA
   ═══════════════════════════════════════════ */
const ratingLabels = { 1: "False", 2: "Mostly False", 3: "Half True", 4: "Mostly True", 5: "True" };
const ratingColors = { 1: "#dc2626", 2: "#f97316", 3: "#eab308", 4: "#22c55e", 5: "#10b981" };
const ratingEmoji = { 1: "🔴", 2: "🟠", 3: "🟡", 4: "🟢", 5: "✅" };
const sourceLabels = { L: "Left-Leaning", C: "Center", R: "Right-Leaning", N: "Nonpartisan/Data" };
const sourceLeanColors = { L: "#60a5fa", C: "#a78bfa", R: "#f87171", N: "#34d399" };

const factClaims = [
  {
    id: 1,
    quote: "I had just inherited a nation in crisis...a stagnant economy...inflation at record levels.",
    category: "Economy",
    rating: 1,
    explanation: "GDP grew 2.5%+ every year under Biden. Inflation peaked at 9.1% in June 2022 — a 40-year high, not an all-time record (that was 23.7% in 1920). By January 2025, inflation was down to 3.0%. The economy was growing, not stagnant.",
    sources: [
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
      { name: "Bureau of Economic Analysis", url: "https://www.bea.gov", lean: "N" },
    ]
  },
  {
    id: 2,
    quote: "In the past nine months, zero illegal aliens have been admitted to the United States.",
    category: "Immigration",
    rating: 2,
    explanation: "Border crossings have dropped dramatically, but \"zero\" is false. In January 2026, Border Patrol encountered roughly 6,000-10,000 migrants at the southern border. CBP has not released any into the US for about 8 months, but people still cross and are apprehended or deported — not \"zero.\"",
    sources: [
      { name: "ABC News", url: "https://abc7.com/post/president-donald-trump-speech-today-fact-checking-state-union-sotu-2026-address/18646901/", lean: "C" },
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "Customs & Border Protection", url: "https://www.cbp.gov", lean: "N" },
    ]
  },
  {
    id: 3,
    quote: "Deadly fentanyl across our border is down by a record 56% in one year.",
    category: "Crime",
    rating: 4,
    explanation: "Fentanyl seizures at the border have indeed dropped significantly. CBP data confirms a roughly 50-60% decline in fentanyl seizures year-over-year. The exact figure varies by measurement period but is broadly accurate.",
    sources: [
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "Customs & Border Protection", url: "https://www.cbp.gov", lean: "N" },
      { name: "NBC News", url: "https://www.nbcnews.com/politics/donald-trump/state-of-union-fact-check-trump-speech-2026-rcna259900", lean: "L" },
    ]
  },
  {
    id: 4,
    quote: "The murder rate saw its single largest decline in recorded history...the lowest number in over 125 years.",
    category: "Crime",
    rating: 5,
    explanation: "The Council on Criminal Justice found a \"strong possibility\" that homicides in 2025 fell to about 4 per 100,000 residents — the lowest rate in records dating back to 1900. The decline continued a trend that began in 2023 under Biden, but the claim about the record low is supported by preliminary data.",
    sources: [
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "Council on Criminal Justice", url: "https://counciloncj.org", lean: "N" },
      { name: "Newsweek", url: "https://www.newsweek.com/donald-trumps-sotu-speech-fact-checked-11579247", lean: "C" },
    ]
  },
  {
    id: 5,
    quote: "The Biden administration...gave us the worst inflation in the history of our country.",
    category: "Inflation",
    rating: 1,
    explanation: "Inflation under Biden peaked at 9.1% in June 2022, the highest in about 40 years. But the all-time record was 23.7% in 1920. Inflation during the Civil War and other periods also far exceeded recent levels. \"Worst in history\" is demonstrably false.",
    sources: [
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
      { name: "Bureau of Labor Statistics", url: "https://www.bls.gov/cpi/", lean: "N" },
    ]
  },
  {
    id: 6,
    quote: "My administration has driven core inflation down to the lowest level in more than five years.",
    category: "Inflation",
    rating: 4,
    explanation: "Core CPI was 2.5% in January 2026, the lowest since March 2021 — nearly five years. The decline from 3.0% to 2.4% (headline) happened during Trump's term, though it continued a trend begun under Biden. The \"more than five years\" framing is slightly overstated but close.",
    sources: [
      { name: "Bureau of Labor Statistics", url: "https://www.bls.gov/cpi/", lean: "N" },
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "ABC News", url: "https://abc7.com/post/president-donald-trump-speech-today-fact-checking-state-union-sotu-2026-address/18646901/", lean: "C" },
    ]
  },
  {
    id: 7,
    quote: "And in the last three months of 2025, it was down to 1.7%.",
    category: "Inflation",
    rating: 2,
    explanation: "The source for this claim is unclear. Core CPI was 2.6% in both November and December 2025. October data is missing due to the government shutdown. No standard inflation measure shows 1.7% for Q4 2025. This appears to cherry-pick an obscure or annualized monthly metric.",
    sources: [
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "Federal Reserve Bank of Cleveland", url: "https://www.clevelandfed.org/indicators-and-data/inflation-nowcasting", lean: "N" },
      { name: "Bureau of Labor Statistics", url: "https://www.bls.gov/cpi/", lean: "N" },
    ]
  },
  {
    id: 8,
    quote: "Gas is now below $2.30 a gallon in most states and in some places $1.99 a gallon.",
    category: "Energy",
    rating: 1,
    explanation: "As of late February 2026, the national average for regular gasoline is about $2.92-2.97 per gallon (AAA). The lowest state average is Oklahoma at roughly $2.41. Gas is not below $2.30 in \"most states\" — it's not below $2.30 in any state on average. Isolated stations may have low prices, but the claim is broadly false.",
    sources: [
      { name: "AAA Gas Prices", url: "https://gasprices.aaa.com/", lean: "N" },
      { name: "Newsweek", url: "https://www.newsweek.com/donald-trumps-sotu-speech-fact-checked-11579247", lean: "C" },
      { name: "WRAL/AP", url: "https://www.wral.com/news/state/live-blog-fact-check-trump-2026-state-of-the-union-february/", lean: "C" },
      { name: "EIA", url: "https://www.eia.gov/petroleum/gasdiesel/", lean: "N" },
    ]
  },
  {
    id: 9,
    quote: "I even saw $1.85 a gallon for gasoline [in Iowa].",
    category: "Energy",
    rating: 2,
    explanation: "A woman at the Iowa event fact-checked this during the speech — the station outside the venue was $2.69. The Iowa state average was $2.57. GasBuddy found only four stations in all of Iowa below $2.00. Trump may have seen a low price, but it grossly misrepresents typical prices.",
    sources: [
      { name: "WRAL/AP", url: "https://www.wral.com/news/state/live-blog-fact-check-trump-2026-state-of-the-union-february/", lean: "C" },
      { name: "GasBuddy", url: "https://www.gasbuddy.com", lean: "N" },
      { name: "AAA Gas Prices", url: "https://gasprices.aaa.com/", lean: "N" },
    ]
  },
  {
    id: 10,
    quote: "The stock market has set 53 all-time record highs since the election.",
    category: "Economy",
    rating: 4,
    explanation: "The S&P 500 did set numerous record closing highs after the November 2024 election. FactCheck.org confirmed the S&P 500 rose about 14.9% from inauguration to Feb 24, 2026. The exact count of record closes is roughly in range, though counts vary by which index is referenced.",
    sources: [
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "Yahoo Finance", url: "https://finance.yahoo.com", lean: "C" },
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
    ]
  },
  {
    id: 11,
    quote: "In 12 months, I secured commitments for more than $18 trillion [in investment].",
    category: "Economy",
    rating: 1,
    explanation: "CNN called this \"fictional.\" The $18 trillion figure is not supported by any independent analysis. It appears to include announcements from companies that were already planned, aspirational pledges over many years, and potential double-counting. Total US GDP is about $29 trillion, making a single-year $18T investment commitment implausible.",
    sources: [
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "NBC News", url: "https://www.nbcnews.com/politics/donald-trump/state-of-union-fact-check-trump-speech-2026-rcna259900", lean: "L" },
    ]
  },
  {
    id: 12,
    quote: "We have added 70,000 new construction jobs in just a very short period of time.",
    category: "Jobs",
    rating: 2,
    explanation: "According to the Bureau of Labor Statistics, only about 44,000 construction jobs were added from January 2025 to January 2026 — significantly fewer than the 70,000 Trump claimed.",
    sources: [
      { name: "NBC News", url: "https://www.nbcnews.com/politics/donald-trump/state-of-union-fact-check-trump-speech-2026-rcna259900", lean: "L" },
      { name: "Bureau of Labor Statistics", url: "https://www.bls.gov", lean: "N" },
    ]
  },
  {
    id: 13,
    quote: "More Americans are working today than at any time in the history of our country.",
    category: "Jobs",
    rating: 3,
    explanation: "True in raw numbers — about 158.6 million people were employed in January 2026, a record. But this is expected as the population grows. More meaningful measures (employment-population ratio, unemployment rate) actually worsened slightly — unemployment went from 4.0% to 4.3%, and the employment-population ratio fell from 60.1% to 59.8%.",
    sources: [
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "Bureau of Labor Statistics", url: "https://www.bls.gov", lean: "N" },
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
    ]
  },
  {
    id: 14,
    quote: "Passing the largest tax cuts in American history.",
    category: "Taxes",
    rating: 1,
    explanation: "The Big Beautiful Bill's tax cuts are significant but are the sixth-largest in American history according to the nonpartisan Tax Foundation's November analysis, not the largest.",
    sources: [
      { name: "NBC News", url: "https://www.nbcnews.com/politics/donald-trump/state-of-union-fact-check-trump-speech-2026-rcna259900", lean: "L" },
      { name: "Tax Foundation", url: "https://taxfoundation.org", lean: "N" },
    ]
  },
  {
    id: 15,
    quote: "The price of eggs is down 60%.",
    category: "Inflation",
    rating: 5,
    explanation: "BLS data shows average retail egg prices fell about 59% from their peak in March 2025 ($6.23/dozen) to January 2026. This claim is accurate.",
    sources: [
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "Bureau of Labor Statistics", url: "https://www.bls.gov/cpi/", lean: "N" },
      { name: "NBC News", url: "https://www.nbcnews.com/politics/donald-trump/state-of-union-fact-check-trump-speech-2026-rcna259900", lean: "L" },
    ]
  },
  {
    id: 16,
    quote: "Chicken, butter, fruit, hotels, automobiles, rent is lower today than when I took office.",
    category: "Inflation",
    rating: 2,
    explanation: "BLS data from March 2025 through January 2026 shows relatively flat changes for most of these: whole chicken went from $2.06 to $2.04, boneless breast barely changed. However, groceries overall are up ~2%, housing up 3.4%, medical care up 3.2%, and apparel up 1.8%. The claim is misleading.",
    sources: [
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "Bureau of Labor Statistics", url: "https://www.bls.gov/cpi/", lean: "N" },
      { name: "WRAL/AP", url: "https://www.wral.com/news/state/live-blog-fact-check-trump-2026-state-of-the-union-february/", lean: "C" },
    ]
  },
  {
    id: 17,
    quote: "Record-setting inflation that cost the typical family $34,000.",
    category: "Economy",
    rating: 3,
    explanation: "Various analyses have estimated cumulative cost-of-living increases under Biden at different figures. Some conservative analyses put cumulative excess costs around $28,000-$35,000 for a typical family over 4 years. The exact figure depends heavily on methodology, baseline, and which costs are included.",
    sources: [
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
      { name: "American Enterprise Institute", url: "https://www.aei.org", lean: "R" },
    ]
  },
  {
    id: 18,
    quote: "Countries that were ripping us off for decades are now paying us hundreds of billions [in tariffs].",
    category: "Trade",
    rating: 1,
    explanation: "Tariffs are paid by US importers, not foreign countries. The Federal Reserve Bank of New York found that nearly 90% of the tariff burden fell on US businesses and consumers. While some foreign exporters may lower prices to remain competitive, the vast majority of costs are borne domestically.",
    sources: [
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
      { name: "Federal Reserve Bank of New York", url: "https://www.newyorkfed.org", lean: "N" },
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
    ]
  },
  {
    id: 19,
    quote: "We have lifted 2.4 million Americans — a record — off of food stamps.",
    category: "Economy",
    rating: 3,
    explanation: "Nearly 42 million Americans rely on SNAP. The administration has tightened eligibility requirements and removed people from rolls. Some were removed due to policy changes rather than improved economic circumstances. The raw number may be approximately correct but needs significant context.",
    sources: [
      { name: "NBC News", url: "https://www.nbcnews.com/politics/donald-trump/state-of-union-fact-check-trump-speech-2026-rcna259900", lean: "L" },
      { name: "USDA", url: "https://www.fns.usda.gov/pd/supplemental-nutrition-assistance-program-snap", lean: "N" },
    ]
  },
  {
    id: 20,
    quote: "Americans will now pay the lowest price anywhere in the world for drugs...from the highest price in the entire world to the lowest.",
    category: "Healthcare",
    rating: 2,
    explanation: "Trump's TrumpRX.gov portal offers discounts on some drugs via most-favored-nation pricing. However, a report from Democrats on the House Energy & Commerce Committee found claims were \"misleading or completely false\" for nearly half the drugs listed. Full scope and details of the program remain unclear, and the US still pays more for most drugs than other developed nations.",
    sources: [
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "ABC News", url: "https://abc7.com/post/president-donald-trump-speech-today-fact-checking-state-union-sotu-2026-address/18646901/", lean: "C" },
      { name: "WRAL/AP", url: "https://www.wral.com/news/state/live-blog-fact-check-trump-2026-state-of-the-union-february/", lean: "C" },
    ]
  },
  {
    id: 21,
    quote: "My first 10 months, I ended eight wars.",
    category: "Foreign Policy",
    rating: 2,
    explanation: "There is no consensus on how many conflicts Trump ended. He has claimed credit for peace between various nations, but in some cases fighting has resumed after ceasefires (Thailand-Cambodia, Rwanda-DRC). His role as mediator is debated, and calling all of these \"wars\" that he personally \"ended\" is a significant exaggeration.",
    sources: [
      { name: "NBC News", url: "https://www.nbcnews.com/politics/donald-trump/state-of-union-fact-check-trump-speech-2026-rcna259900", lean: "L" },
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
    ]
  },
  {
    id: 22,
    quote: "NATO countries have agreed to pay 5% of GDP for military defense rather than 2%.",
    category: "Foreign Policy",
    rating: 3,
    explanation: "Trump pushed NATO allies to increase defense spending beyond the 2% target. Some NATO members have discussed higher targets. However, a formal binding agreement to 5% across all NATO nations has not been independently confirmed by NATO itself. Most members still struggle to meet the original 2% target.",
    sources: [
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
      { name: "NATO", url: "https://www.nato.int", lean: "N" },
    ]
  },
  {
    id: 23,
    quote: "Everything we send to Ukraine is sent through NATO and they pay us in full.",
    category: "Foreign Policy",
    rating: 2,
    explanation: "This claim is misleading. While some Ukraine aid has been coordinated through NATO, much US aid went directly. The characterization that NATO countries \"pay us in full\" for everything sent to Ukraine is not supported by available evidence and oversimplifies complex allied burden-sharing arrangements.",
    sources: [
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
    ]
  },
  {
    id: 24,
    quote: "Minnesota, where members of the Somali community have pillaged an estimated $19 billion.",
    category: "Crime",
    rating: 1,
    explanation: "The Justice Department charged 92 people (including 82 Somali Americans) in a ~$300 million food assistance fraud scheme during COVID. The $19 billion figure vastly overstates the documented fraud. Trump provided no evidence for the $19B claim. The 82 charged represent a tiny fraction of Minnesota's ~100,000 Somali Americans.",
    sources: [
      { name: "ABC News", url: "https://abc7.com/post/president-donald-trump-speech-today-fact-checking-state-union-sotu-2026-address/18646901/", lean: "C" },
      { name: "Department of Justice", url: "https://www.justice.gov", lean: "N" },
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
    ]
  },
  {
    id: 25,
    quote: "The cheating is rampant in our elections.",
    category: "Elections",
    rating: 1,
    explanation: "There is no evidence of widespread fraud in US elections. Trump's own former Attorney General William Barr, DHS officials, and dozens of courts — including Trump-appointed judges — found no evidence of systematic fraud in the 2020 or subsequent elections. Studies consistently show voter fraud is extremely rare.",
    sources: [
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
      { name: "Brennan Center for Justice", url: "https://www.brennancenter.org", lean: "C" },
    ]
  },
  {
    id: 26,
    quote: "Since I took office, the typical 401(k) balance is up by at least $30,000.",
    category: "Economy",
    rating: 3,
    explanation: "The S&P 500 rose about 14.9% from inauguration to Feb 24, 2026. A $200,000 balance would have gained about $30,000. The claim is plausible for median 401(k) balances but many working Americans have much smaller balances. Fidelity reported the average 401(k) balance was around $127,000 in 2024.",
    sources: [
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "Fidelity Investments", url: "https://www.fidelity.com", lean: "N" },
    ]
  },
  {
    id: 27,
    quote: "No state can be allowed to rip children from their parents' arms and transition them to a new gender against the parents' will.",
    category: "Social Policy",
    rating: 1,
    explanation: "No US state has laws allowing the government to take children from parents and give them gender transition surgery without parental consent. Most medical care for minors, including gender-affirming care, requires parental consent. This claim describes a scenario that does not exist in law.",
    sources: [
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "PolitiFact", url: "https://www.politifact.com/article/2026/feb/25/live-fact-check-state-union-trump-address/", lean: "N" },
    ]
  },
  {
    id: 28,
    quote: "Crime in Washington is now at the lowest level ever recorded, murders down close to 100%.",
    category: "Crime",
    rating: 3,
    explanation: "Crime in DC did drop significantly after National Guard deployment. However, \"lowest ever recorded\" and \"murders down close to 100%\" are exaggerations. DC homicides fell substantially but didn't drop to zero. The claim overstates the improvement.",
    sources: [
      { name: "WRAL/AP", url: "https://www.wral.com/news/state/live-blog-fact-check-trump-2026-state-of-the-union-february/", lean: "C" },
      { name: "DC Metropolitan Police", url: "https://mpdc.dc.gov", lean: "N" },
    ]
  },
  {
    id: 29,
    quote: "We will actually have a balanced budget overnight [by eliminating fraud].",
    category: "Economy",
    rating: 1,
    explanation: "The GAO estimated the entire federal government could lose $233-521 billion annually to fraud. But the federal deficit was nearly $1.8 trillion in FY2025, and CBO projects $1.9 trillion for FY2026. Even eliminating all fraud would not come close to balancing the budget.",
    sources: [
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "Government Accountability Office", url: "https://www.gao.gov", lean: "N" },
      { name: "Congressional Budget Office", url: "https://www.cbo.gov", lean: "N" },
    ]
  },
  {
    id: 30,
    quote: "100% of all jobs created under my administration have been in the private sector.",
    category: "Jobs",
    rating: 3,
    explanation: "Federal government employment has declined under Trump (partly due to DOGE-related cuts), and private sector jobs have grown. However, state and local government employment has also increased. The claim is approximately true for federal vs private but ignores that government employment overall includes state/local levels.",
    sources: [
      { name: "Bureau of Labor Statistics", url: "https://www.bls.gov", lean: "N" },
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
    ]
  },
  {
    id: 31,
    quote: "Under the cease fire, every single hostage, both living and dead, has been returned home.",
    category: "Foreign Policy",
    rating: 4,
    explanation: "The Israel-Hamas ceasefire led to the return of living hostages and remains of deceased hostages. The process was largely completed, though some details about the final status of all hostages vary by source. The claim is broadly accurate.",
    sources: [
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
      { name: "CNN", url: "https://www.cnn.com/2026/02/24/politics/fact-check-state-of-the-union", lean: "L" },
    ]
  },
  {
    id: 32,
    quote: "Pakistan and India would have been a nuclear war...35 million people would have died if it were not for my involvement.",
    category: "Foreign Policy",
    rating: 2,
    explanation: "Trump did intervene in India-Pakistan tensions. However, the claim that 35 million people would have died without his involvement is unverifiable and appears to be a dramatic assertion. While tensions were real, independent analysts have not confirmed this specific casualty estimate or that nuclear war was imminent.",
    sources: [
      { name: "FactCheck.org", url: "https://www.factcheck.org/2026/02/factchecking-trumps-state-of-the-union-address/", lean: "N" },
      { name: "NBC News", url: "https://www.nbcnews.com/politics/donald-trump/state-of-union-fact-check-trump-speech-2026-rcna259900", lean: "L" },
    ]
  },
  {
    id: 33,
    quote: "And even beef...is starting to come down significantly.",
    category: "Inflation",
    rating: 1,
    explanation: "Ground beef reached a fresh all-time high of $6.75/lb in January 2026, up nearly 22% year-over-year according to BLS data. Beef prices are going up, not down.",
    sources: [
      { name: "NBC News", url: "https://www.nbcnews.com/politics/donald-trump/state-of-union-fact-check-trump-speech-2026-rcna259900", lean: "L" },
      { name: "Bureau of Labor Statistics", url: "https://www.bls.gov/cpi/", lean: "N" },
    ]
  },
  {
    id: 34,
    quote: "Marco [Rubio] got 100% of the votes when he was in confirmation.",
    category: "Other",
    rating: 5,
    explanation: "Marco Rubio was confirmed as Secretary of State by a vote of 99-0 in the Senate on January 20, 2025. This is accurate.",
    sources: [
      { name: "U.S. Senate", url: "https://www.senate.gov", lean: "N" },
      { name: "CBS News", url: "https://www.cbsnews.com/news/fact-check-state-of-the-union-2026/", lean: "C" },
    ]
  },
  {
    id: 35,
    quote: "Iryna [Zarutska] was killed by someone who 'came in through open borders.'",
    category: "Crime",
    rating: 1,
    explanation: "The suspect in the murder of Iryna Zarutska, DeCarlos Brown Jr., is a US citizen born in Charlotte, North Carolina, according to local media and his own social media profiles. He did not enter the country through any border.",
    sources: [
      { name: "Newsweek", url: "https://www.newsweek.com/donald-trumps-sotu-speech-fact-checked-11579247", lean: "C" },
      { name: "Local media reports", url: "", lean: "C" },
    ]
  },
];

const factCategories = [...new Set(factClaims.map(c => c.category))];

/* ═══════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════ */
const panelStyle = { background: "#13132a", borderRadius: 12, padding: "24px", border: "1px solid #1e1e3a", marginBottom: 24 };
const CustomSentTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const sec = speechSections.find(s => (d.idx - 1) >= s.start && (d.idx - 1) < s.end);
  return (
    <div style={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", maxWidth: 340, fontSize: 12, color: "#e0e0e0", lineHeight: 1.5 }}>
      <div style={{ fontWeight: 700, color: getColor(d.score), marginBottom: 4 }}>
        #{d.idx} — {getCategory(d.score)} ({d.score > 0 ? "+" : ""}{d.score.toFixed(3)})
        {sec && <span style={{ color: "#888", fontWeight: 400 }}> · {sec.label}</span>}
      </div>
      <div style={{ color: "#ccc" }}>{d.text}</div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   SENTIMENT TAB
   ═══════════════════════════════════════════ */
function SentimentTab() {
  const [expandedSection, setExpandedSection] = useState(null);
  const timelineData = useMemo(() => compounds.map((c, i) => ({ idx: i + 1, score: c, text: sentences[i] || `Sentence ${i + 1}` })), []);
  const barData = sentCategories.map(cat => ({ name: cat, count: dist[cat], pct: ((dist[cat] / 294) * 100).toFixed(1), fill: catColors[cat] }));

  const rollingData = useMemo(() => {
    const w = 10;
    return timelineData.map((d, i) => {
      const start = Math.max(0, i - Math.floor(w / 2));
      const end = Math.min(timelineData.length, i + Math.ceil(w / 2));
      const slice = timelineData.slice(start, end);
      const avg = slice.reduce((s, v) => s + v.score, 0) / slice.length;
      return { ...d, avg: parseFloat(avg.toFixed(4)) };
    });
  }, [timelineData]);

  const sectionStats = useMemo(() => speechSections.map(sec => {
    const sents = timelineData.slice(sec.start, sec.end);
    const d = {};
    sentCategories.forEach(c => { d[c] = sents.filter(s => getCategory(s.score) === c).length; });
    const scores = sents.map(s => s.score);
    return { ...sec, count: sents.length, dist: d, avg: scores.reduce((a, b) => a + b, 0) / scores.length, min: Math.min(...scores), max: Math.max(...scores), sentences: sents };
  }), [timelineData]);

  const posCount = dist["Positive"] + dist["Very Positive"];
  const negCount = dist["Negative"] + dist["Very Negative"];

  return (
    <>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
        {[
          { label: "Total Sentences", value: "294", color: "#8b8baa" },
          { label: "Net Positive", value: `${posCount} (${((posCount / 294) * 100).toFixed(0)}%)`, color: "#22c55e" },
          { label: "Neutral", value: `${dist["Neutral"]} (${((dist["Neutral"] / 294) * 100).toFixed(0)}%)`, color: "#a3a3a3" },
          { label: "Net Negative", value: `${negCount} (${((negCount / 294) * 100).toFixed(0)}%)`, color: "#dc2626" },
        ].map((s, i) => (
          <div key={i} style={{ background: "#13132a", borderRadius: 10, padding: "14px 16px", border: "1px solid #1e1e3a" }}>
            <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Distribution */}
      <div style={panelStyle}>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px", color: "#c8c8e0" }}>Sentiment Distribution</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} barSize={60}>
            <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: "#ffffff08" }} content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const d = payload[0].payload;
              return (<div style={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#e0e0e0" }}><span style={{ fontWeight: 700, color: d.fill }}>{d.name}</span>: {d.count} sentences ({d.pct}%)</div>);
            }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>{barData.map((e, i) => <Cell key={i} fill={e.fill} />)}</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Timeline */}
      <div style={panelStyle}>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px", color: "#c8c8e0" }}>Sentiment Flow Through the Speech</h2>
        <p style={{ fontSize: 12, color: "#666", margin: "0 0 16px" }}>Each dot = one sentence. Line = 10-sentence rolling average. Hover for details.</p>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={rollingData} margin={{ top: 30, right: 10, bottom: 20, left: 10 }}>
            <defs>
              <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} /><stop offset="100%" stopColor="#22c55e" stopOpacity={0} /></linearGradient>
              <linearGradient id="negGrad" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stopColor="#dc2626" stopOpacity={0.3} /><stop offset="100%" stopColor="#dc2626" stopOpacity={0} /></linearGradient>
            </defs>
            {speechSections.map((s, i) => (
              <ReferenceArea key={`s-${i}`} x1={s.start + 1} x2={s.end} y1={-1} y2={1} fill={sectionColors[i]} stroke={sectionBorderColors[i]} strokeDasharray="3 3"
                label={{ value: s.label, position: "insideTop", fill: i % 2 === 0 ? "#8b8bcc" : "#c4a35a", fontSize: 9, fontWeight: 600, offset: 6 }} />
            ))}
            <XAxis dataKey="idx" tick={{ fill: "#555", fontSize: 10 }} axisLine={{ stroke: "#333" }} tickLine={false} label={{ value: "Sentence #", position: "insideBottom", offset: -10, fill: "#666", fontSize: 11 }} />
            <YAxis domain={[-1, 1]} tick={{ fill: "#555", fontSize: 10 }} axisLine={{ stroke: "#333" }} tickLine={false} ticks={[-1, -0.5, 0, 0.5, 1]} />
            <Tooltip content={<CustomSentTooltip />} />
            <ReferenceLine y={0} stroke="#444" strokeDasharray="4 4" />
            <Area type="monotone" dataKey="avg" stroke="none" fill="url(#posGrad)" baseValue={0} connectNulls />
            <Line type="monotone" dataKey="score" stroke="none" dot={({ cx, cy, payload }) => <circle cx={cx} cy={cy} r={2.5} fill={getColor(payload.score)} fillOpacity={0.7} />} activeDot={{ r: 5, stroke: "#fff", strokeWidth: 1 }} />
            <Line type="monotone" dataKey="avg" stroke="#60a5fa" strokeWidth={2.5} dot={false} strokeOpacity={0.9} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Section Breakdown */}
      <div style={panelStyle}>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px", color: "#c8c8e0" }}>Section-by-Section Breakdown</h2>
        <p style={{ fontSize: 12, color: "#666", margin: "0 0 20px" }}>Click any section to expand details with mini charts and extreme sentences.</p>
        {sectionStats.map((sec, i) => {
          const avgColor = sec.avg > 0.15 ? "#22c55e" : sec.avg < -0.15 ? "#dc2626" : sec.avg < 0 ? "#f97316" : "#3b82f6";
          const isExp = expandedSection === i;
          return (
            <div key={i} style={{ marginBottom: 2 }}>
              <div onClick={() => setExpandedSection(isExp ? null : i)} style={{ display: "grid", gridTemplateColumns: "180px 60px 1fr 50px", alignItems: "center", gap: 12, padding: "10px 14px", background: isExp ? "#1a1a3a" : i % 2 === 0 ? "#13132a" : "#15152e", borderRadius: 6, cursor: "pointer", border: isExp ? "1px solid #333" : "1px solid transparent", transition: "all 0.15s ease" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#d0d0e8" }}><span style={{ color: "#666", fontSize: 10, marginRight: 6 }}>#{sec.start + 1}–{sec.end}</span>{sec.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: avgColor, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{sec.avg > 0 ? "+" : ""}{sec.avg.toFixed(2)}</div>
                <div style={{ display: "flex", height: 20, borderRadius: 4, overflow: "hidden", background: "#0d0d1a" }}>
                  {sentCategories.map(cat => { const c = sec.dist[cat] || 0; const p = (c / sec.count) * 100; if (p === 0) return null; return <div key={cat} title={`${cat}: ${c} (${p.toFixed(0)}%)`} style={{ width: `${p}%`, background: catColors[cat], opacity: 0.85, minWidth: c > 0 ? 3 : 0 }} />; })}
                </div>
                <div style={{ fontSize: 11, color: "#555", textAlign: "right" }}>{sec.count} sent. {isExp ? "▲" : "▼"}</div>
              </div>
              {isExp && (
                <div style={{ padding: "16px 14px", background: "#111128", borderRadius: "0 0 8px 8px" }}>
                  <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
                    {sentCategories.map(cat => { const c = sec.dist[cat] || 0; return (<div key={cat} style={{ fontSize: 11, color: "#999" }}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: catColors[cat], marginRight: 4, verticalAlign: "middle" }} />{cat}: <span style={{ color: catColors[cat], fontWeight: 600 }}>{c}</span> ({((c / sec.count) * 100).toFixed(0)}%)</div>); })}
                    <div style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>Range: <span style={{ color: "#dc2626" }}>{sec.min.toFixed(2)}</span> to <span style={{ color: "#22c55e" }}>+{sec.max.toFixed(2)}</span></div>
                  </div>
                  <ResponsiveContainer width="100%" height={140}>
                    <AreaChart data={sec.sentences} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                      <XAxis dataKey="idx" tick={{ fill: "#444", fontSize: 9 }} axisLine={{ stroke: "#222" }} tickLine={false} />
                      <YAxis domain={[-1, 1]} tick={{ fill: "#444", fontSize: 9 }} axisLine={{ stroke: "#222" }} tickLine={false} ticks={[-1, 0, 1]} width={25} />
                      <Tooltip content={<CustomSentTooltip />} />
                      <ReferenceLine y={0} stroke="#333" strokeDasharray="3 3" />
                      <Area type="monotone" dataKey="score" stroke="none" fill="url(#posGrad)" baseValue={0} />
                      <Line type="monotone" dataKey="score" stroke="none" dot={({ cx, cy, payload }) => <circle cx={cx} cy={cy} r={3.5} fill={getColor(payload.score)} fillOpacity={0.85} />} activeDot={{ r: 6, stroke: "#fff", strokeWidth: 1.5 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Most Positive</div>
                      {sec.sentences.filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 2).map((s, j) => (
                        <div key={j} style={{ fontSize: 10, color: "#888", lineHeight: 1.4, marginBottom: 4, borderLeft: "2px solid #22c55e30", paddingLeft: 6 }}>
                          <span style={{ color: "#22c55e", fontWeight: 700 }}>+{s.score.toFixed(3)}</span> {s.text}
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: "#dc2626", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Most Negative</div>
                      {sec.sentences.filter(s => s.score < 0).sort((a, b) => a.score - b.score).slice(0, 2).map((s, j) => (
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

      {/* Extremes */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={panelStyle}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#22c55e", margin: "0 0 12px" }}>🟢 Most Positive Sentences</h3>
          {[...timelineData].sort((a, b) => b.score - a.score).slice(0, 5).map((d, i) => (
            <div key={i} style={{ fontSize: 11, color: "#aaa", marginBottom: 8, lineHeight: 1.5, borderLeft: "2px solid #22c55e30", paddingLeft: 8 }}>
              <span style={{ color: "#22c55e", fontWeight: 700 }}>+{d.score.toFixed(3)}</span> #{d.idx}: {d.text}
            </div>
          ))}
        </div>
        <div style={panelStyle}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", margin: "0 0 12px" }}>🔴 Most Negative Sentences</h3>
          {[...timelineData].sort((a, b) => a.score - b.score).slice(0, 5).map((d, i) => (
            <div key={i} style={{ fontSize: 11, color: "#aaa", marginBottom: 8, lineHeight: 1.5, borderLeft: "2px solid #dc262630", paddingLeft: 8 }}>
              <span style={{ color: "#dc2626", fontWeight: 700 }}>{d.score.toFixed(3)}</span> #{d.idx}: {d.text}
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", color: "#444", fontSize: 11, paddingTop: 8 }}>
        Analysis performed using VADER (Valence Aware Dictionary and sEntiment Reasoner) · Scores range from -1 (most negative) to +1 (most positive)
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   FACT CHECK TAB
   ═══════════════════════════════════════════ */
function FactCheckTab() {
  const [filter, setFilter] = useState("All");
  const [challengeMode, setChallengeMode] = useState(false);
  const [guesses, setGuesses] = useState({});
  const [revealed, setRevealed] = useState({});
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [showFloatingPill, setShowFloatingPill] = useState(true);
  const [pillDismissed, setPillDismissed] = useState(false);

  const filtered = filter === "All" ? factClaims : factClaims.filter(c => c.category === filter);
  const avgRating = (factClaims.reduce((s, c) => s + c.rating, 0) / factClaims.length).toFixed(2);
  const ratingDist = [1, 2, 3, 4, 5].map(r => ({ name: ratingLabels[r], rating: r, count: factClaims.filter(c => c.rating === r).length, fill: ratingColors[r] }));

  const categoryAvg = useMemo(() => {
    return factCategories.map(cat => {
      const claims = factClaims.filter(c => c.category === cat);
      const avg = claims.reduce((s, c) => s + c.rating, 0) / claims.length;
      return { category: cat, avg: parseFloat(avg.toFixed(2)), count: claims.length };
    }).sort((a, b) => a.avg - b.avg);
  }, []);

  // Challenge logic
  const totalClaims = factClaims.length;
  const guessedCount = Object.keys(guesses).length;
  const revealedCount = Object.keys(revealed).length;

  const startChallenge = useCallback(() => {
    setChallengeMode(true);
    setGuesses({});
    setRevealed({});
    setChallengeComplete(false);
    setShowFloatingPill(false);
  }, []);

  const exitChallenge = useCallback(() => {
    setChallengeMode(false);
    setGuesses({});
    setRevealed({});
    setChallengeComplete(false);
  }, []);

  const makeGuess = useCallback((claimId, guess) => {
    setGuesses(prev => ({ ...prev, [claimId]: guess }));
    setTimeout(() => setRevealed(prev => ({ ...prev, [claimId]: true })), 300);
  }, []);

  useEffect(() => {
    if (challengeMode && revealedCount === totalClaims && revealedCount > 0) {
      setChallengeComplete(true);
    }
  }, [challengeMode, revealedCount, totalClaims]);

  // Bias analysis
  const biasAnalysis = useMemo(() => {
    if (!challengeComplete) return null;
    const diffs = factClaims.map(c => ({ id: c.id, category: c.category, guess: guesses[c.id], actual: c.rating, diff: (guesses[c.id] || 0) - c.rating }));
    const avgGuess = diffs.reduce((s, d) => s + (d.guess || 0), 0) / diffs.length;
    const avgActual = diffs.reduce((s, d) => s + d.actual, 0) / diffs.length;
    const exactMatches = diffs.filter(d => d.guess === d.actual).length;
    const closeMatches = diffs.filter(d => Math.abs(d.diff) <= 1).length;
    const overRated = diffs.filter(d => d.diff > 0).length;
    const underRated = diffs.filter(d => d.diff < 0).length;

    const catBias = {};
    factCategories.forEach(cat => {
      const catDiffs = diffs.filter(d => d.category === cat);
      if (catDiffs.length > 0) {
        catBias[cat] = catDiffs.reduce((s, d) => s + d.diff, 0) / catDiffs.length;
      }
    });

    return { avgGuess: avgGuess.toFixed(2), avgActual: avgActual.toFixed(2), exactMatches, closeMatches, overRated, underRated, total: diffs.length, catBias, accuracy: ((closeMatches / diffs.length) * 100).toFixed(0) };
  }, [challengeComplete, guesses]);

  return (
    <>
      {/* Challenge Complete: Bias Reveal */}
      {challengeComplete && biasAnalysis && (
        <div style={{ background: "linear-gradient(135deg, #1a1a3a 0%, #0d2818 100%)", borderRadius: 16, padding: 28, border: "1px solid #2a4a3a", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#34d399" }}>🧠 Your Bias Reveal</h2>
            <button onClick={exitChallenge} style={{ background: "#ffffff10", border: "1px solid #ffffff20", color: "#aaa", padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}>
              Exit Challenge
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            <div style={{ background: "#ffffff08", borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#34d399" }}>{biasAnalysis.accuracy}%</div>
              <div style={{ fontSize: 11, color: "#888" }}>Accuracy (within ±1)</div>
            </div>
            <div style={{ background: "#ffffff08", borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#60a5fa" }}>{biasAnalysis.exactMatches}/{biasAnalysis.total}</div>
              <div style={{ fontSize: 11, color: "#888" }}>Exact Matches</div>
            </div>
            <div style={{ background: "#ffffff08", borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#f97316" }}>
                {parseFloat(biasAnalysis.avgGuess) > parseFloat(biasAnalysis.avgActual) ? "+" : ""}
                {(parseFloat(biasAnalysis.avgGuess) - parseFloat(biasAnalysis.avgActual)).toFixed(2)}
              </div>
              <div style={{ fontSize: 11, color: "#888" }}>Your Bias</div>
            </div>
            <div style={{ background: "#ffffff08", borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#a78bfa" }}>{biasAnalysis.avgGuess}</div>
              <div style={{ fontSize: 11, color: "#888" }}>Your Avg vs {biasAnalysis.avgActual} actual</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6, marginBottom: 16 }}>
            {parseFloat(biasAnalysis.avgGuess) > parseFloat(biasAnalysis.avgActual) + 0.3
              ? "You tended to give the benefit of the doubt — rating claims as more truthful than the evidence supports. This pattern suggests optimistic bias toward political speech."
              : parseFloat(biasAnalysis.avgGuess) < parseFloat(biasAnalysis.avgActual) - 0.3
              ? "You were more skeptical than the evidence warranted — rating claims as less truthful than sources found. This pattern suggests skeptical bias toward political speech."
              : "Your instincts were well-calibrated — your ratings closely matched the source-backed assessments overall. Nice work."}
          </div>
          <div style={{ fontSize: 12, color: "#999", fontWeight: 600, marginBottom: 8 }}>Bias by Category:</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(biasAnalysis.catBias).map(([cat, bias]) => (
              <span key={cat} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: bias > 0.5 ? "#22c55e15" : bias < -0.5 ? "#dc262615" : "#ffffff08", color: bias > 0.5 ? "#22c55e" : bias < -0.5 ? "#dc2626" : "#888", border: `1px solid ${bias > 0.5 ? "#22c55e30" : bias < -0.5 ? "#dc262630" : "#333"}` }}>
                {cat}: {bias > 0 ? "+" : ""}{bias.toFixed(1)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
        <div style={{ background: "#13132a", borderRadius: 10, padding: "14px 16px", border: "1px solid #1e1e3a" }}>
          <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Claims Checked</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#8b8baa" }}>{factClaims.length}</div>
        </div>
        <div style={{ background: "#13132a", borderRadius: 10, padding: "14px 16px", border: "1px solid #1e1e3a" }}>
          <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Average Rating</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: parseFloat(avgRating) >= 3 ? "#eab308" : "#f97316" }}>{avgRating} / 5</div>
        </div>
        <div style={{ background: "#13132a", borderRadius: 10, padding: "14px 16px", border: "1px solid #1e1e3a" }}>
          <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>True / Mostly True</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#22c55e" }}>{factClaims.filter(c => c.rating >= 4).length} ({((factClaims.filter(c => c.rating >= 4).length / factClaims.length) * 100).toFixed(0)}%)</div>
        </div>
        <div style={{ background: "#13132a", borderRadius: 10, padding: "14px 16px", border: "1px solid #1e1e3a" }}>
          <div style={{ fontSize: 11, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>False / Mostly False</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#dc2626" }}>{factClaims.filter(c => c.rating <= 2).length} ({((factClaims.filter(c => c.rating <= 2).length / factClaims.length) * 100).toFixed(0)}%)</div>
        </div>
      </div>

      {/* Challenge Invitation */}
      {!challengeMode && !challengeComplete && (
        <div style={{ background: "linear-gradient(135deg, #1a1035 0%, #0d1a2e 100%)", borderRadius: 16, padding: 24, border: "1px solid #3b2d6b", marginBottom: 28, display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 36 }}>🎯</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#c4b5fd", marginBottom: 4 }}>Think you can spot the truth?</div>
            <div style={{ fontSize: 13, color: "#8b8baa" }}>Rate each claim before seeing the answer. Test your fact-detection skills and discover your political bias.</div>
          </div>
          <button onClick={startChallenge} style={{ background: "linear-gradient(135deg, #7c3aed, #6366f1)", border: "none", color: "#fff", padding: "10px 24px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, whiteSpace: "nowrap", transition: "transform 0.1s", flexShrink: 0 }}
            onMouseOver={e => e.target.style.transform = "scale(1.05)"} onMouseOut={e => e.target.style.transform = "scale(1)"}>
            Start the Challenge →
          </button>
        </div>
      )}

      {/* Challenge Progress Bar */}
      {challengeMode && !challengeComplete && (
        <div style={{ background: "#13132a", borderRadius: 12, padding: "14px 20px", border: "1px solid #1e1e3a", marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#c4b5fd", whiteSpace: "nowrap" }}>🎯 Challenge Mode</div>
          <div style={{ flex: 1, height: 8, background: "#0d0d1a", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${(revealedCount / totalClaims) * 100}%`, height: "100%", background: "linear-gradient(90deg, #7c3aed, #34d399)", borderRadius: 4, transition: "width 0.5s ease" }} />
          </div>
          <div style={{ fontSize: 12, color: "#888", whiteSpace: "nowrap" }}>{revealedCount}/{totalClaims}</div>
          <button onClick={exitChallenge} style={{ background: "#ffffff10", border: "1px solid #ffffff20", color: "#888", padding: "4px 12px", borderRadius: 6, cursor: "pointer", fontSize: 11 }}>Exit</button>
        </div>
      )}

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={panelStyle}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px", color: "#c8c8e0" }}>Rating Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ratingDist} barSize={48}>
              <XAxis dataKey="name" tick={{ fill: "#888", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#666", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: "#ffffff08" }} content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return <div style={{ background: "#1a1a2e", border: "1px solid #333", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#e0e0e0" }}><span style={{ fontWeight: 700, color: d.fill }}>{d.name}</span>: {d.count} claims</div>;
              }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>{ratingDist.map((e, i) => <Cell key={i} fill={e.fill} />)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={panelStyle}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px", color: "#c8c8e0" }}>Accuracy by Category</h2>
          <div style={{ marginTop: 8 }}>
            {categoryAvg.map((cat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 100, fontSize: 11, color: "#aaa", textAlign: "right", flexShrink: 0 }}>{cat.category}</div>
                <div style={{ flex: 1, height: 22, background: "#0d0d1a", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                  <div style={{ width: `${(cat.avg / 5) * 100}%`, height: "100%", background: ratingColors[Math.round(cat.avg)], opacity: 0.8, borderRadius: 4, transition: "width 0.5s" }} />
                  <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 10, fontWeight: 700, color: "#fff" }}>{cat.avg.toFixed(1)}</div>
                </div>
                <div style={{ fontSize: 10, color: "#666", width: 30, flexShrink: 0 }}>{cat.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Source Legend */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
        {Object.entries(sourceLabels).map(([key, label]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#aaa" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: sourceLeanColors[key] }} />
            {label}
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {["All", ...factCategories].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "5px 14px", borderRadius: 20, border: filter === cat ? "1px solid #6366f1" : "1px solid #2a2a4a", background: filter === cat ? "#6366f120" : "#13132a", color: filter === cat ? "#a5b4fc" : "#888", fontSize: 12, cursor: "pointer", transition: "all 0.15s" }}>
            {cat} {cat !== "All" && <span style={{ opacity: 0.6 }}>({(cat === "All" ? factClaims : factClaims.filter(c => c.category === cat)).length})</span>}
          </button>
        ))}
      </div>

      {/* Claims */}
      {filtered.map(claim => {
        const isGuessed = guesses[claim.id] !== undefined;
        const isRevealed = revealed[claim.id] || !challengeMode;
        const guess = guesses[claim.id];
        const diff = isGuessed ? guess - claim.rating : 0;

        return (
          <div key={claim.id} style={{ ...panelStyle, marginBottom: 16, transition: "all 0.3s ease" }}>
            {/* Quote */}
            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 28, lineHeight: 1, opacity: 0.3 }}>"</div>
              <div>
                <div style={{ fontSize: 14, color: "#d0d0e8", lineHeight: 1.6, fontStyle: "italic", marginBottom: 8 }}>{claim.quote}</div>
                <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 20, background: "#ffffff08", color: "#888", border: "1px solid #333" }}>{claim.category}</span>
              </div>
            </div>

            {/* Challenge: Guess buttons */}
            {challengeMode && !isGuessed && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>How truthful do you think this is?</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[1, 2, 3, 4, 5].map(r => (
                    <button key={r} onClick={() => makeGuess(claim.id, r)} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, border: `1px solid ${ratingColors[r]}40`, background: `${ratingColors[r]}10`, color: ratingColors[r], fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }}
                      onMouseOver={e => { e.target.style.background = `${ratingColors[r]}30`; e.target.style.transform = "scale(1.05)"; }}
                      onMouseOut={e => { e.target.style.background = `${ratingColors[r]}10`; e.target.style.transform = "scale(1)"; }}>
                      {ratingEmoji[r]} {ratingLabels[r]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Challenge: Your guess vs actual */}
            {challengeMode && isGuessed && (
              <div style={{ display: "flex", gap: 12, marginBottom: 14, padding: "10px 14px", borderRadius: 8, background: diff === 0 ? "#22c55e10" : Math.abs(diff) <= 1 ? "#eab30810" : "#dc262610", border: `1px solid ${diff === 0 ? "#22c55e30" : Math.abs(diff) <= 1 ? "#eab30830" : "#dc262630"}` }}>
                <div style={{ fontSize: 12, color: "#bbb" }}>
                  Your guess: <span style={{ color: ratingColors[guess], fontWeight: 700 }}>{ratingEmoji[guess]} {ratingLabels[guess]}</span>
                  {isRevealed && (
                    <span> → Actual: <span style={{ color: ratingColors[claim.rating], fontWeight: 700 }}>{ratingEmoji[claim.rating]} {ratingLabels[claim.rating]}</span>
                    {diff === 0 ? <span style={{ color: "#22c55e", marginLeft: 8 }}>✨ Exact match!</span> : Math.abs(diff) <= 1 ? <span style={{ color: "#eab308", marginLeft: 8 }}>Close!</span> : <span style={{ color: "#dc2626", marginLeft: 8 }}>Off by {Math.abs(diff)}</span>}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Rating + Explanation (shown when revealed) */}
            {isRevealed && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ padding: "4px 14px", borderRadius: 8, background: `${ratingColors[claim.rating]}20`, color: ratingColors[claim.rating], fontWeight: 700, fontSize: 14, border: `1px solid ${ratingColors[claim.rating]}40` }}>
                    {ratingEmoji[claim.rating]} {ratingLabels[claim.rating]}
                  </div>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1, 2, 3, 4, 5].map(r => (
                      <div key={r} style={{ width: 20, height: 6, borderRadius: 3, background: r <= claim.rating ? ratingColors[claim.rating] : "#2a2a4a" }} />
                    ))}
                  </div>
                </div>

                <div style={{ fontSize: 13, color: "#bbb", lineHeight: 1.6, marginBottom: 14, padding: "12px 14px", background: "#0d0d1a", borderRadius: 8, borderLeft: `3px solid ${ratingColors[claim.rating]}` }}>
                  {claim.explanation}
                </div>

                {/* Sources */}
                <div style={{ fontSize: 11, color: "#666", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>Sources</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {claim.sources.map((src, si) => (
                    <a key={si} href={src.url || "#"} target="_blank" rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${sourceLeanColors[src.lean]}10`, color: sourceLeanColors[src.lean], border: `1px solid ${sourceLeanColors[src.lean]}30`, textDecoration: "none", transition: "all 0.15s" }}
                      onMouseOver={e => e.target.style.background = `${sourceLeanColors[src.lean]}25`}
                      onMouseOut={e => e.target.style.background = `${sourceLeanColors[src.lean]}10`}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: sourceLeanColors[src.lean] }} />
                      {src.name}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* Floating pill */}
      {!challengeMode && !challengeComplete && !pillDismissed && showFloatingPill && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #7c3aed, #6366f1)", padding: "10px 24px", borderRadius: 30, boxShadow: "0 8px 32px #7c3aed40", display: "flex", alignItems: "center", gap: 12, zIndex: 100, cursor: "pointer" }}
          onClick={startChallenge}>
          <span style={{ fontSize: 14 }}>🎯</span>
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>Take the Challenge</span>
          <button onClick={e => { e.stopPropagation(); setPillDismissed(true); }} style={{ background: "none", border: "none", color: "#ffffff60", cursor: "pointer", fontSize: 16, padding: "0 0 0 8px" }}>×</button>
        </div>
      )}

      <div style={{ textAlign: "center", color: "#444", fontSize: 11, paddingTop: 16 }}>
        Fact-checks compiled from multiple sources across the political spectrum · Ratings reflect consensus of cited sources · Feb 25, 2026
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function App() {
  const [tab, setTab] = useState("sentiment");

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", background: "#0d0d1a", color: "#e8e8f0", minHeight: "100vh", padding: "32px 20px" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 940, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 12 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: "-0.5px", background: "linear-gradient(135deg, #60a5fa, #34d399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            2026 State of the Union — Analysis Dashboard
          </h1>
          <p style={{ color: "#888", margin: "8px 0 0", fontSize: 14 }}>
            Trump's 2026 SOTU: 294 sentences, {factClaims.length} fact-checkable claims · February 24, 2026
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: 4, marginBottom: 32, borderBottom: "1px solid #222", paddingBottom: 0 }}>
          {[
            { id: "sentiment", label: "📊 Sentiment Analysis", desc: "VADER NLP scoring" },
            { id: "factcheck", label: "🔍 Fact Check", desc: `${factClaims.length} claims verified` },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                padding: "12px 24px", border: "none", borderBottom: tab === t.id ? "3px solid #60a5fa" : "3px solid transparent",
                background: tab === t.id ? "#13132a" : "transparent", color: tab === t.id ? "#e8e8f0" : "#666",
                fontSize: 14, fontWeight: tab === t.id ? 700 : 500, cursor: "pointer", transition: "all 0.2s",
                borderRadius: "8px 8px 0 0", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2,
              }}
              onMouseOver={e => { if (tab !== t.id) e.currentTarget.style.color = "#aaa"; }}
              onMouseOut={e => { if (tab !== t.id) e.currentTarget.style.color = "#666"; }}>
              <span>{t.label}</span>
              <span style={{ fontSize: 10, color: tab === t.id ? "#888" : "#555" }}>{t.desc}</span>
            </button>
          ))}
        </div>

        {tab === "sentiment" ? <SentimentTab /> : <FactCheckTab />}
      </div>
    </div>
  );
}
