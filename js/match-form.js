function createMatchForm() {
    // Add your code below
    const taxi = new TrueFalseButtons('Leaves tarmac mission', 'taxi', 'Se mueve fuera del tarmac', 'No se mueve');

    const autoUpper = new NumericCounter('Upper Hub Cargo', 'auto-upper-cargo', 0, Season.MAX_CARGO_PER_HUB);

    const autoLower = new NumericCounter('Lower Hub Cargo', 'auto-lower-cargo', 0, Season.MAX_CARGO_PER_HUB);

    matchForm.sections.autonomous.addQuestion(taxi);
    matchForm.sections.autonomous.addQuestion(autoUpper);
    matchForm.sections.autonomous.addQuestion(autoLower);

    const upperCargoTarmac = new NumericCounter('Cargo shot from Tarmac to Upper Hub', 'upper-cargo-tarmac', 0, Season.MAX_CARGO_PER_HUB);
    const upperCargoLaunchPad = new NumericCounter('Cargo shot from Launch Pad to Upper Hub', 'upper-cargo-launch-pad', 0, Season.MAX_CARGO_PER_HUB);
    const upperCargoOther = new NumericCounter('Cargo shot from other field zone to Upper Hub - Llenar mapa de zonas abajo', 'upper-cargo-other-zone', 0, Season.MAX_CARGO_PER_HUB);

    const lowerCargoLaunchPad = new NumericCounter('Cargo shot from below Lower Hub', 'lower-cargo-launch-pad', 0, Season.MAX_CARGO_PER_HUB);

    const launchingZones = new FieldZones("Elige las zonas desde donde hace disparos", 'launching-zones', ['A', 'B', 'C', 'D', 'No aplica'], 'img/rapid-react-field-zones.png');

    const lowerCargoTarmac = new NumericCounter('Cargo shot from Tarmac to Lower Hub', 'lower-cargo-tarmac', 0, Season.MAX_CARGO_PER_HUB);
    const hangar = new CheckboxWithText('Engaging with Hangar', 'hangar-engaging');
    hangar.addInput({
        id: 'hangar-low',
        value: 'Low Rung'
    });
    hangar.addInput({
        id: 'hangar-mid',
        value: 'Mid Rung'
    });
    hangar.addInput({
        id: 'hangar-high',
        value: 'High Rung'
    });
    hangar.addInput({
        id: 'hangar-traversal',
        value: 'Traversal Rung'
    });
    hangar.addInput({
        id: 'hangar-no',
        value: 'No'
    });
    hangar.addInput({
        id: 'hangar-fell',
        value: 'Se cayó en el intento'
    });

    matchForm.sections.teleop.addQuestion(upperCargoLaunchPad);
    matchForm.sections.teleop.addQuestion(upperCargoTarmac);
    matchForm.sections.teleop.addQuestion(upperCargoOther);
    matchForm.sections.teleop.addQuestion(lowerCargoLaunchPad);
    matchForm.sections.teleop.addQuestion(lowerCargoTarmac);
    matchForm.sections.teleop.addQuestion(launchingZones);
    matchForm.sections.teleop.addQuestion(hangar);
    // Add your code above
    matchForm.renderSections();
}