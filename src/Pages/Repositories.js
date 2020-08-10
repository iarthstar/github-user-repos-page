import React, { useState, useEffect } from 'react';
import Layout from '../Commons/Layout';
import { initTabs } from '../Constants/view';
import Tabs from '../Components/Tabs';
import Repos from '../Components/Repos';
import Profile from '../Components/Profile';
import TextField from '../Commons/Inputs/TextField';
import Select from '../Commons/Inputs/Select';
import { connect } from 'react-redux';
import { getRepos } from '../Redux/Actions/Repos';
import { getUser } from '../Redux/Actions/User';


const params = new URLSearchParams(window.location);

const allTypesOption = { label: 'All', value: 'All' };
const allLanguagesOption = { label: 'All', value: 'All' };

const typesOptions = [
  allTypesOption,
  { label: 'Public', value: 'public' },
  { label: 'Private', value: 'private' },
  { label: 'Sources', value: 'sources' },
  { label: 'Forks', value: 'fork' }
];

const languagesOptions = [
  allLanguagesOption
];

const initQueries = {
  'q': params.get('q') || '',
  'type': params.get('type') || allTypesOption,
  'language': params.get('language') || allLanguagesOption,
}

const Repositories = (props) => {
  const {
    user
  } = props;

  const [queries, setQueries] = useState(initQueries);

  let username = window.location.pathname;
  username = username === '/' ? 'iarthstar' : username.slice(1);

  useEffect(() => {
    props.getUser({ username });
    props.getRepos({ username });
  }, []);

  const [repos, setRepos] = useState([]);
  const [tabs, setTabs] = useState(initTabs);

  const [languages, setLanguages] = useState(languagesOptions);

  useEffect(() => {
    const sortedRepos = props.repos.sort((a, b) => new Date(a.pushed_at).valueOf() - new Date(b.pushed_at).valueOf()).reverse();
    setRepos(sortedRepos);
    let languages = sortedRepos.map(({ language }) => language);
    languages = [...new Set(languages)];
    languages = languages.filter((language) => Boolean(language));
    languages = languages.map((language) => ({ label: language, value: language }));
    setLanguages([allLanguagesOption, ...languages]);

    const updatedTabs = [...tabs];
    updatedTabs[1].count = sortedRepos.length;
    setTabs(updatedTabs);
  }, [props.repos]);

  const handleForm = (name, { target: { value } }) => {
    const q = { ...queries };
    q[name] = value;
    setQueries(q);
  };

  const filteredRepos = () => repos.filter(({ name, language, fork, private: is_private }) => {
    let lang = queries['language'].value === 'All' ? true : language === queries['language'].value;
    let type = queries['type'].value === 'All' ? true : false;
    if (queries['type'].value === 'sources') {
      type = !fork;
    } else if (queries['type'].value === 'private') {
      type = is_private;
    } else if (queries['type'].value === 'public') {
      type = !is_private;
    } else if (queries['type'].value === 'fork') {
      type = fork;
    }
    return name.includes(queries['q']) && lang && type;
  });

  const tabView = (displayClass) => (
    <div className={`pos-sticky col-12 grid bb-1 bg-white ${displayClass}`} style={{ zIndex: '1020', marginTop: '24px' }}>
      <div className="col-xs-0 col-sm-0 col-md-0 col-lg-0 col-xl-1"></div>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 px-xl-2 grid debug">
        <div className="col-xs-0 col-sm-0 col-md-3 col-lg-3 col-xl-3"></div>
        <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 px-1">
          <Tabs data={tabs} />
        </div>
      </div>
      <div className="col-xs-0 col-sm-0 col-md-0 col-lg-0 col-xl-1"></div>
    </div>
  );

  return (
    <Layout>
      <div className="grid">
        {tabView('d-xs-none d-sm-none d-md-none d-lg-none d-xl-block')}
        <div className="col-xs-0 col-sm-0 col-md-0 col-lg-0 col-xl-1"></div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-10 px-xl-2 grid debug">
          <div className="col-12 grid">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 debug">
              <Profile data={user} />
            </div>
            {tabView('d-xs-block d-sm-block d-md-block d-lg-block d-xl-none')}
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 px-1 debug">
              <div className="grid mt-2 pb-1 bb-1 col-gap row-gap">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <TextField
                    type="text"
                    className='w-fill'
                    onChange={(e) => handleForm("q", e)}
                    value={queries["q"]}
                    placeHolder="Find a repository..."
                  />
                </div>
                <div className='col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3'>
                  <Select
                    options={typesOptions}
                    value={queries['type']}
                    label='Type'
                    onChange={(e) => handleForm('type', e)}
                  />
                </div>
                <div className='col-xs-6 col-sm-6 col-md-3 col-lg-3 col-xl-3'>
                  <Select
                    options={languages}
                    label='Language'
                    value={queries['language']}
                    onChange={(e) => handleForm('language', e)}
                  />
                </div>
              </div>
              <Repos data={filteredRepos()} />
            </div>
          </div>
        </div>
        <div className="col-xs-0 col-sm-0 col-md-0 col-lg-1 col-xl-1"></div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (st) => ({
  repos: st.repos.repos,
  user: st.user.user
});

export default connect(mapStateToProps, {
  getRepos,
  getUser
})(Repositories);