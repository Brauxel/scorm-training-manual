import { throttle } from 'lodash';
import EventBus from 'app/EventBus';
import { scrollToOffset } from 'app/util/anim';
import Section from '../Section';
import coverImage from './coverImage.jpg';
import template from './template.html';
import './style.styl';

const BigPicture = Section.extend({

  sectionID: 'big-picture-section',

  defaultProps: {
    showMasthead: () => {},
    hideMasthead: () => {},
    showBookmarkPanel: () => {},
    hideBookmarkPanel: () => {},
  },

  events: {
    'click .BigPicture__cover__scrollDownButton': 'onCoverScrollClick',
  },

  render() {
    this.el.innerHTML = template({coverImage});

    this
      .registerActivities(this.getActivities(), this.getCompletedActivityIDs())
      .registerSummary({
        summaryContent: `
          <div class="SectionSummary__listContainer">
            <p>Great! You’ve completed the first section and discovered:</p>
            <ul>
              <li>who <span class="nbnMention">nbn</span> are and what we do</li>
              <li>your role and <span class="nbnMention">nbn</span>’s value proposition</li>
              <li>the opportunities in operate and maintain activities.</li>
            </ul>
          </div>
          <p>Next, you will find out more about <span class="nbnMention">nbn</span> as a brand and what your role is in representing <span class="nbnMention">nbn</span>. Before you continue, take a few seconds and think about what a ‘brand’ means to you.</p>
        `,
      })
      .initShowable();

    return this;
  },

  setupScroll() {
    const scrollOffset = this.$('.BigPicture__cover').outerHeight();

    this.props.hideMasthead();
    this.props.showBookmarkPanel();

    this.listenTo(EventBus, 'windowScroll',
      throttle(({ scrollY }) => this.onWindowScroll(scrollY, scrollOffset), 400));
  },

  onCoverScrollClick() {
    const top = this.$('.Section__activityContainer').offset().top;
    scrollToOffset(top);
  },

  onWindowScroll(pos, offset) {
    if (pos < offset) {
      this.props.hideMasthead();
      this.props.showBookmarkPanel();
    } else {
      this.props.showMasthead();
      this.props.hideBookmarkPanel();
    }
  },

  handleSummaryContinue() {
    this.props.showMasthead();
    if (this.props.nextURL) EventBus.trigger('navigate', this.props.nextURL);
  },
});

export default BigPicture;
