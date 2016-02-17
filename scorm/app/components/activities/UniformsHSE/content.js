import nbnHat from './nbnHat.jpg';
import nbnHats from './nbnHats.jpg';
import randomHat1 from './randomHat1.jpg';
import randomHat2 from './randomHat2.jpg';
import cleanBoots from './cleanBoots.jpg';
import nbnHiVis from './nbnHiVis.jpg';
import randomHiVis from './randomHiVis.jpg';
import employeeCard from './employeeCard.png';
import bootsID from './bootsID.jpg';
import mrFluffy from './mrFluffy.jpg';
import happy from './happy.jpg';
import grumpy from './grumpy.jpg';
import disinterested from './disinterested.jpg';
import uniformWrong from './uniformWrong.jpg';
import uniformDirty from './uniformDirty.jpg';
import uniformClean from './uniformClean.jpg';

export const questions = [
  {
    key: 'uniform',
    title: 'You’re getting ready for work. Which uniform do you wear?',
    feedback: {
      correct: '<em>That’s it!</em> You have to wear the correct uniform (long sleeve top and trousers) and keep your clothes clean.',
      incorrect: '<em>Not quite.</em> You have to wear the correct uniform (long sleeve top and trousers) and keep your clothes clean.',
    },
    requiredKeys: ['uniformClean'],
    options: [
      {
        key: 'uniformWrong',
        figure: uniformWrong,
      },
      {
        key: 'uniformClean',
        figure: uniformClean,
      },
      {
        key: 'uniformDirty',
        figure: uniformDirty,
      },
    ],
  },

  {
    key: 'hat',
    title: 'Which hat would you take with you?',
    feedback: {
      correct: '<em>Yes.</em> You’ve picked the correct <span class="nbnMention">nbn</span>™ branded hat. You may also be supplied with two other <span class="nbnMention">nbn</span>™ branded hats: a cap and a hard hat with brim.',
      incorrect: '<em>That’s not it.</em> For <span class="nbnMention">nbn</span> work you need to wear an <span class="nbnMention">nbn</span>™ branded hat. You may also be supplied with two other <span class="nbnMention">nbn</span>™ branded hats: a cap and a hard hat with brim.',
    },
    requiredKeys: ['hatNbn'],
    options: [
      {
        key: 'hatRandom1',
        figure: randomHat1,
      },
      {
        key: 'hatNbn',
        figure: nbnHat,
      },
      {
        key: 'hatRandom2',
        figure: randomHat2,
      },
    ],
  },

  {
    key: 'vest',
    title: 'When required to wear hi-vis gear, which one would you choose?',
    feedback: {
      correct: '<em>Well done!</em> When required to wear hi-vis gear it will need to have the <span class="nbnMention">nbn</span>™ brand on it. Your employer will also supply you with your company’s hard hat – this may also be worn with a brim for sun protection.',
      incorrect: '<em>Not quite.</em> When required to wear hi-vis gear it will need to have the <span class="nbnMention">nbn</span>™ brand on it. Your employer will also supply you with your company’s hard hat – this may also be worn with a brim for sun protection.',
    },
    requiredKeys: ['vestNbn'],
    options: [
      {
        key: 'vestNbn',
        figure: nbnHiVis,
      },
      {
        key: 'vestRandom',
        figure: randomHiVis,
      },
    ],
  },

  {
    key: 'moreItems',
    title: 'Which of these should you have with you? <em>There is more than one.</em>',
    feedback: {
      correct: '<em>Great work!</em> You’ve picked all of the items you need for your <span class="nbnMention">nbn</span> work. Remember you will also need your <span class="nbnMention">nbn</span>™ Accreditation Card.',
      incorrect: '<em>You haven’t quite nailed it.</em> You need to take with you: your Employee ID card and a clean, sturdy pair of shoes. Remember you will also need your <span class="nbnMention">nbn</span>™ Accreditation Card. Leave the dog at home!',
    },
    requiredKeys: ['moreItemsIDCard', 'moreItemsCleanBoots'],
    options: [
      {
        key: 'moreItemsIDCard',
        figure: employeeCard,
      },
      {
        key: 'moreItemsCleanBoots',
        figure: cleanBoots,
      },
      {
        key: 'moreItemsMrFluffy',
        figure: mrFluffy,
      },
    ],
  },

  {
    key: 'mood',
    title: 'How’s your mood?',
    feedback: {
      correct: '<em>You’re good to go!</em> When you’re representing <span class="nbnMention">nbn</span> you always need to show a positive and friendly attitude.',
      incorrect: '<em>You might not be in the best mood</em>, but when you’re representing <span class="nbnMention">nbn</span> you always need to show a positive and friendly attitude.',
    },
    requiredKeys: ['happy'],
    options: [
      {
        key: 'disinterested',
        figure: disinterested,
      },
      {
        key: 'happy',
        figure: happy,
      },
      {
        key: 'grumpy',
        figure: grumpy,
      },
    ],
  },
];

export const summaries = {
  title: 'Activity complete! To recap, here’s what you need:',
  success: '<em>Good work!</em> Now you know what you need to represent <span class="nbnMention">nbn</span> as a positive brand.',
  noSuccess: '<em>Not quite there,</em> but that’s what this training is for! Now you know what you need to represent <span class="nbnMention">nbn</span> as a positive brand.',
};

export const summaryPanels = [
  {
    key: 'uniform',
    caption: 'Clean and correct uniform',
    figure: uniformClean,
  },
  {
    key: 'hats',
    caption: '<span class="nbnMention">nbn</span>™ branded hats',
    figure: nbnHats,
  },
  {
    key: 'idAndShoes',
    caption: 'EmployeeID, <span class="nbnMention">nbn</span>™ accreditation card, and clean, sturdy shoes',
    figure: bootsID,
  },
  {
    key: 'vest',
    caption: '<span class="nbnMention">nbn</span>™ branded hi-vis vest',
    figure: nbnHiVis,
  },
  {
    key: 'attitude',
    caption: 'Friendly and positive attitude',
    figure: happy,
  },
];
