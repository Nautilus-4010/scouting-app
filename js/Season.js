class Season {
    static SEASON_NAME = 'crescendo';
    static REGIONALES = [
        'Monterrey',
        'Colorado'
    ];
}

language = new SpanishText();
const storageDir = Season.SEASON_NAME + Season.REGIONALES[0].toLowerCase().replace(' ', '-');