import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { themeConfig } from '@shopgate/engage';
import { Grid, Link, I18n } from '@shopgate/engage/components';
import Button from '@shopgate/pwa-ui-shared/Button';
import { getUserData, isUserLoggedIn } from '@shopgate/engage/user';
import { LOGIN_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { getIntlMessage } from '../../helpers';
import { styles as configStyles } from '../../config';

const styles = {
  card: css({
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    flexDirection: 'column',
    backgroundColor: themeConfig.colors.light,
  }, configStyles.card).toString(),
  media: css({
    height: 200,
    backgroundSize: 'cover',
  }, configStyles.media).toString(),
  primaryTitle: css({
    padding: `${themeConfig.variables.gap.small}px ${themeConfig.variables.gap.big}px`,
    fontSize: '1.25rem',
  }, configStyles.primaryTitle).toString(),
  primaryText: css({
    padding: `${themeConfig.variables.gap.small}px ${themeConfig.variables.gap.big}px`,
  }, configStyles.primaryText).toString(),
  supportingText: css({
    padding: `${themeConfig.variables.gap.small}px ${themeConfig.variables.gap.big}px`,
    fontSize: '0.85rem',
  }, configStyles.supportingText).toString(),
  actions: css({
    padding: `${themeConfig.variables.gap.small}px ${themeConfig.variables.gap.big}px`,
  }, configStyles.actions).toString(),
  action: css({
    marginRight: '0.5rem',
    color: themeConfig.colors.primary,
  }, configStyles.action).toString(),
};

/**
 * @returns {JSX}
 */
const PersonalizationWidget = ({ settings, isLoggedIn, userData }) => {
  if (!settings || !userData || userData.isFetching) {
    return null;
  }

  const {
    media: {
      image,
      href,
    },
    primary: {
      title,
      text,
    },
    supportingText,
    actions = [],
    showLoginButton,
    loggedOutWelcomeText,
  } = settings;

  let mediaBg = '';
  if (image) {
    mediaBg = css({
      backgroundImage: `url('${image}')`,
    });
  }

  return (isLoggedIn) ? (
    <Grid className={styles.card}>
      {image && href && (
        <Link href={href}>
          <Grid.Item className={`${styles.media} ${mediaBg}`} />
        </Link>
      )}
      {image && !href && <Grid.Item className={`${styles.media} ${mediaBg}`} />}

      {title && (
        <Grid.Item className={styles.primaryTitle}>
          <span dangerouslySetInnerHTML={{ __html: getIntlMessage(title).format(userData) }} />
        </Grid.Item>
      )}

      {text && (
        <Grid.Item className={styles.primaryText}>
          <span dangerouslySetInnerHTML={{ __html: getIntlMessage(text).format(userData) }} />
        </Grid.Item>
      )}

      {supportingText && (
        <Grid.Item className={styles.supportingText}>
          <span
            dangerouslySetInnerHTML={{ __html: getIntlMessage(supportingText).format(userData) }}
          />
        </Grid.Item>
      )}
      {actions && actions.length && (
        <Grid.Item className={styles.actions}>
          {actions.map(action => (
            <Link href={action.href} className={styles.action} key={action.title}>
              <span
                dangerouslySetInnerHTML={{ __html: getIntlMessage(action.title).format(userData) }}
              />
            </Link>
          ))}
        </Grid.Item>
      )}
    </Grid>
  ) : showLoginButton && (
    <Grid className={styles.card}>
      {loggedOutWelcomeText && (
      <Grid.Item className={styles.primaryTitle}>
        <span dangerouslySetInnerHTML={{ __html: loggedOutWelcomeText }} />
      </Grid.Item>
      )}
      <Grid.Item className={styles.primaryText}>
        <Link href={LOGIN_PATH}>
          <Button type="secondary" className={styles.button}>
            <I18n.Text string="login.button" />
          </Button>
        </Link>
      </Grid.Item>
    </Grid>
  );
};

PersonalizationWidget.propTypes = {
  settings: PropTypes.shape().isRequired,
  isLoggedIn: PropTypes.bool,
  userData: PropTypes.shape(),
};

PersonalizationWidget.defaultProps = {
  isLoggedIn: null,
  userData: null,
};

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  isLoggedIn: isUserLoggedIn(state),
  userData: getUserData(state),
});

export default connect(mapStateToProps)(PersonalizationWidget);
