import { render, screen, fireEvent } from '@testing-library/react'
import DropDown from './dropDown'

const teamOptions = [
  { _id: 'team0', name: 'Select here' },
  { _id: 'team1', name: 'Education' },
  { _id: 'team2', name: 'Mentorship' },
  { _id: 'team3', name: 'Outreach' },
  { _id: 'team4', name: 'Personal Development' },
  { _id: 'team5', name: 'Tech Project' }
].map(team => ({ ...team, name: team.name.toLowerCase() }))

const errors = {
  teamId: false
}

const VolunteerForm = ({ teamOptions }) => {
  return (
    <form data-testid="testId">
      <DropDown
        onChange={() => {}}
        value=""
        name="teamId"
        arrayList={teamOptions}
        isEmpty={errors.teamId}
        label={
          <span>
            Please select the team you want to volunteer for. You can read about
            the teams on this
            <a
              href="https://codeyourfuture.io/volunteers/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              page
            </a>
          </span>
        }
      />
    </form>
  )
}

describe('Volunteer-team-preference', () => {
  // Testing form content
  it('testing form', () => {
    render(<VolunteerForm teamOptions={teamOptions} />)
    expect(screen.getByTestId('testId')).toHaveTextContent(
      'Please select the team you want to volunteer for.'
    )
  })

  // Test to see if we can open a new tab
  it('Opening CYF page in a new tab/page', () => {
    render(<VolunteerForm teamOptions={teamOptions} />)
    const linkElement = screen.getByText('page')
    expect(linkElement).toHaveAttribute(
      'href',
      'https://codeyourfuture.io/volunteers/'
    )
    expect(linkElement).toHaveAttribute('target', '_blank')
  })

  it('team options are correctly displayed in the dropdown', () => {
    render(<VolunteerForm teamOptions={teamOptions} />)
    teamOptions.forEach(option => {
      const selectOptions = screen.queryAllByText(option.name)
      selectOptions.forEach(selectOption => {
        expect(selectOption).toBeInTheDocument()
      })
    })
  })

  it('new volunteer cannot skip this question', () => {
    render(<VolunteerForm teamOptions={teamOptions} />)
    const selectElement = screen.getByLabelText(
      /Please select the team you want to volunteer for/i
    )
    fireEvent.change(selectElement, { target: { value: '' } })
    fireEvent.blur(selectElement)
    expect(screen.getByTestId('testId')).toHaveTextContent(
      'Please select the team you want to volunteer for.'
    )
  })

  // Check if the teams are in alphabetical order
  it('form updates with new team', () => {
    const newTeam = { _id: 'team6', name: 'New Team' }
    const updatedTeamOptions = [...teamOptions, newTeam]
    render(<VolunteerForm teamOptions={updatedTeamOptions} />)
    const selectElement = screen.getByLabelText(
      /Please select the team you want to volunteer for/i
    )
    expect(selectElement).toContainHTML(
      '<option value="team6">New Team</option>'
    )
  })

  it('form updates with deleted team', () => {
    const deletedTeam = { _id: 'team1', name: 'Education' }
    const updatedTeamOptions = teamOptions.filter(
      team => team._id !== deletedTeam._id
    )
    render(<VolunteerForm teamOptions={updatedTeamOptions} />)
    const selectElement = screen.getByLabelText(
      /Please select the team you want to volunteer for/i
    )
    expect(selectElement).not.toContainHTML(
      '<option value="team1">Education</option>'
    )
  })
})
