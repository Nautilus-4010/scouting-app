function createPitForm() {
    // Add your code below

    const chasis = new RadioWithImages('Which type of drivetrain does the robot have?', 'Drivetrain');
    chasis.addInput({
        id: 'chasis-mecanum',
        value: 'Mecanum',
        img: 'img/chasis/Mecanum.jpg'
    });
    chasis.addInput({
        id: 'chasis-omni',
        value: 'Omni drive',
        img: 'img/chasis/Omni.jpg'
    });
    chasis.addInput({
        id: 'chasis-west-coast',
        value: 'West Coast',
        img: 'img/chasis/West_Coast.jpg'
    });
    chasis.addInput({
        id: 'chasis-swerve',
        value: 'Swerve',
        img: 'img/chasis/Swerve.jpg'
    });
    chasis.addInput({
        id: 'chasis-otro',
        value: 'Other drivetrain',
        img: 'img/Confused-Robot.jpg'
    });

    const intake = new RadioWithText('Which mechanism does the robot use to take Game Pieces?', 'Intake');
    intake.addInput({
        id: 'intake-claw',
        value: 'Claw'
    });
    intake.addInput({
        id: 'intake-no',
        value: 'Does not have an intake'
    });
    intake.addInput({
        id: 'intake-suction',
        value: 'Vacuum or suction intake'
    });
    intake.addInput({
        id: 'intake-other',
        value: 'Other type of intake'
    });

    const matchFocus = new BigTextArea('Which task does the robot do best during a match?', 'match-focus', 4);

    const vision = new TrueFalseButtons('The robot uses vision to align with the nodes?', 'Vision', 'Uses vision', 'Does not use vision');

    const allyNeeds = new BigTextArea('What do they expect from other robots in an alliance?', 'ally-needs', 10);

    const chargingStationBalance = new TextInput('Which sensors do they use to balance the robot on the Charge Station?', 'charge-station-sensors', 'NavX, accelerometer, IMU', 1);

    pitForm.sections.engineering.addQuestion(chasis);
    pitForm.sections.engineering.addQuestion(intake);
    pitForm.sections.engineering.addQuestion(matchFocus);
    pitForm.sections.engineering.addQuestion(vision);
    pitForm.sections.engineering.addQuestion(allyNeeds);
    pitForm.sections.engineering.addQuestion(chargingStationBalance);

    const sponsors = new BigTextArea("List the team's sponsors and strategic alliances", 'Sponsors', 3);

    const representativeSponsors = new BigTextArea('Which sponsors or astrategic alliances best represents and/or defines their team?', 'representative-sponsors', 1);

    const funding = new BigTextArea('How do they fund their team?', 'Funding', 10);

    const projects = new BigTextArea('Which are the most relevant team projects?', 'Projects', 10);

    const characteristics = new BigTextArea('What are the characteristics or elements that differentiate their team from the others?', 'Identity', 3);

    const socialNetworks = new BigTextArea('Social media accounts', 'Accounts', 1);

    const mediaStrategy = new BigTextArea('What is their social media strategy?', 'social-media');

    pitForm.sections.team.addQuestion(funding);
    pitForm.sections.team.addQuestion(sponsors);
    pitForm.sections.team.addQuestion(representativeSponsors);
    pitForm.sections.team.addQuestion(projects);
    pitForm.sections.team.addQuestion(characteristics);
    pitForm.sections.team.addQuestion(socialNetworks);
    pitForm.sections.team.addQuestion(mediaStrategy);

    // Add your code above
    pitForm.renderSections();
}
