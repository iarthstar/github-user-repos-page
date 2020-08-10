import React from 'react';
import { Icon } from '@iconify/react';
import law16 from '@iconify/icons-octicon/law-16';
import star16 from '@iconify/icons-octicon/star-16';
import repoForked16 from '@iconify/icons-octicon/repo-forked-16';
import { getRandom } from '../Utils';
import { colors } from '../Constants';
import Button from '../Commons/Buttons/Button';


const Repos = (props) => {
  const { data } = props;

  const makeRepos = (elem, index) => {
    const {
      name, html_url, description,
      language, stargazers_count, forks_count,
      license, pushed_at, private: is_private
    } = elem;

    const date = new Date(pushed_at).getDate();
    const month = new Date(pushed_at).toLocaleString('default', { month: 'short' });
    const year = new Date(pushed_at).getFullYear();

    const metadata = [
      {
        text: language,
        type: 'langauge',
        icon: colors[parseInt(getRandom(0, colors.length))]
      },
      {
        text: stargazers_count,
        icon: star16
      },
      {
        text: license && license.name,
        icon: law16
      },
      {
        text: forks_count,
        icon: repoForked16
      },
      {
        text: `Updated on ${date} ${month} ${year}`,
      }
    ];

    const makeMetadata = ({ text, icon, type }, index) => (
      <li className="d-flex align-items-center" style={{ color: "#586069", marginRight: "16px" }}>
        {type ? <span className="color-dot" style={{ backgroundColor: icon }} /> : <Icon icon={icon} />}
        &nbsp; <span className="fs-12">{text}</span>
      </li>
    );

    return (
      <li key={`repo-${index}`} className="py-2 d-flex flex-col bb-1">
        <a className="repo-name fs-20" href={html_url}>{name}</a>
        {is_private && <span className="ml-1 tag tag-private">Private</span>}
        <p className="fs-14 repo-desc">{description}</p>
        <ul className="d-flex">
          {metadata.filter(({ text }) => Boolean(text)).map(makeMetadata)}
        </ul>
      </li>
    );
  }

  return (
    <ul>
      {data.map(makeRepos)}
    </ul>
  );
}

export default Repos;