const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

import './index.css'

const FiltersGroup = props => {
  const renderTypeOfEmploymentList = () => (
    <div className="employment-container">
      <h1 className="employment-text">Type of Employment</h1>
      <form className="employment-list-container">
        {employmentTypesList.map(eachEmployeeObject => {
          const onChangeEmploymentId = () => {
            const {changeEmploymentTypeId} = props
            changeEmploymentTypeId(eachEmployeeObject.employmentTypeId)
          }
          return (
            <ul
              key={eachEmployeeObject.employmentTypeId}
              className="employee-container-list-item"
              onClick={onChangeEmploymentId}
            >
              <input type="checkbox" id={eachEmployeeObject.employmentTypeId} />
              <label
                className="employee-label"
                htmlFor={eachEmployeeObject.employmentTypeId}
              >
                {eachEmployeeObject.label}
              </label>
            </ul>
          )
        })}
      </form>
      <hr className="separator" />
    </div>
  )

  const renderSalaryRangesList = () => (
    <div className="salary-container">
      <h1 className="employment-text">Salary Range</h1>
      <form className="employent-list-container">
        {salaryRangesList.map(eachSalaryObject => {
          const onChangeSalaryRangeId = () => {
            const {changeSalaryRangeId} = props
            changeSalaryRangeId(eachSalaryObject.salaryRangeId)
          }
          return (
            <ul
              key={eachSalaryObject.salaryRangeId}
              className="employee-list-item"
              onClick={onChangeSalaryRangeId}
            >
              <input type="radio" id={eachSalaryObject.salaryRangeId} />
              <label
                className="employee-label"
                htmlFor={eachSalaryObject.salaryRangeId}
              >
                {eachSalaryObject.label}
              </label>
            </ul>
          )
        })}
      </form>
    </div>
  )

  return (
    <div>
      {renderTypeOfEmploymentList()}
      {renderSalaryRangesList()}
    </div>
  )
}

export default FiltersGroup
