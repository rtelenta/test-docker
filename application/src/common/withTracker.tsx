import * as React from "react";
import * as GoogleAnalytics from "react-ga";

interface IProps {
    location?: any;
}

GoogleAnalytics.initialize(process.env.GA || '');

const withTracker = (WrappedComponent: any, options = {}) => {
  const trackPage = (page: any) => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  // eslint-disable-next-line
  const HOC = class extends React.Component<IProps, {}> {
    public componentDidMount() {
      // eslint-disable-next-line
      const page = this.props.location.pathname + this.props.location.search;
      trackPage(page);
    }

    public componentDidUpdate(prevProps: any) {
      const currentPage =
        prevProps.location.pathname + prevProps.location.search;
      const nextPage =
        this.props.location.pathname + this.props.location.search;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    public render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withTracker;