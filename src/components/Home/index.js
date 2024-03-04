import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Home = props => {
  const {history} = props
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    history.replace('/login')
  }

  const onClickFindJobs = () => {
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="content-section">
          <h1 className="home-heading">Find the Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching jobs, salary information, company
            reviews.Find the job that fits your ability and potential
          </p>
          <button
            type="button"
            className="find-jobs-btn"
            onClick={onClickFindJobs}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
