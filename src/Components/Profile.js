import React from 'react';
import Button from '../Commons/Buttons/Button';
import { Icon } from '@iconify/react';
import kebabHorizontal16 from '@iconify/icons-octicon/kebab-horizontal-16';
import people16 from '@iconify/icons-octicon/people-16';
import organization16 from '@iconify/icons-octicon/organization-16';
import location16 from '@iconify/icons-octicon/location-16';


const Profile = (props) => {
  const { data } = props;
  const {
    name,
    avatar_url,
    bio,
    login,
    followers,
    following,
    company,
    location
  } = data || {};

  const connections = [
    {
      label: 'followers',
      value: followers,
      icon: people16
    },
    {
      label: 'following',
      value: following,
    },
  ];

  const details = [
    {
      icon: organization16,
      label: company,
    },
    {
      icon: location16,
      label: location,
    }
  ];

  const makeConnections = ({ label, icon, value }, index) => (
    <>
      <li className="d-flex align-items-center fs-14 user-graph">
        <Icon icon={icon} /> &nbsp;
      <span>{value}</span> &nbsp;{label}
      </li>
      {index % 2 === 0 ? <>&nbsp;•</> : ''}
    </>
  );

  const makeDetails = ({ label, icon }) => (
    <li className="d-flex align-items-center fs-14" style={{ marginTop: '8px' }}>
      <Icon icon={icon} /> &nbsp;{label}
    </li>
  );

  return (
    <div className="px-1 profile-wrapper mt-xl--2rem">
      <div className="grid">
        <img alt={login} className="profile-img col-xs-3 col-sm-3 col-md-12 col-lg-12 col-xl-12" src={avatar_url} />
        <h1 className="full-name mt-1 col-xs-9 col-sm-9 col-md-12 col-lg-12 col-xl-12">{name}<br />
          <span className="user-name mt-1">{login}</span>
        </h1>
      </div>
      <p className="mt-1 mb-1">{bio}</p>
      <div className="d-flex w-100 align-items-center justify-content-between">
        <Button>
          <span className="fs-14 px-1">Follow</span>
        </Button>
        <Icon className="" icon={kebabHorizontal16} />
      </div>
      <ul className="d-flex mt-1">
        {connections.map(makeConnections)}
      </ul>
      <ul className="mt-1">
        {details.map(makeDetails)}
      </ul>

    </div>
  );
}

export default Profile;