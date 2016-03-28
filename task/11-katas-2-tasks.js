'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    var numberWide = 3;
    var numberCount = 9;
    var result = 0;

    var Letter = function () {
    };

    Letter.prototype.at = function (i) {
        this.i = i;
        this.topLine = this.i * numberWide;
        this.midLine = this.i * numberWide + numberCount * numberWide + 1;
        this.bottLine = this.i * numberWide + 2 * numberCount * numberWide + 2;
        return this;
    };

    Letter.prototype.centerTop = function () {
        return bankAccount.charAt(this.topLine + 1)
    };
    Letter.prototype.centerMiddle = function () {
        return bankAccount.charAt(this.midLine + 1)
    };
    Letter.prototype.centerBottom = function () {
        return bankAccount.charAt(this.bottLine + 1)
    };

    Letter.prototype.leftMiddle = function () {
        return bankAccount.charAt(this.midLine)
    };
    Letter.prototype.leftBottom = function () {
        return bankAccount.charAt(this.bottLine)
    };

    Letter.prototype.rightMiddle = function () {
        return bankAccount.charAt(this.midLine + 2)
    };
    Letter.prototype.rightBottom = function () {
        return bankAccount.charAt(this.bottLine + 2)
    };

    for (let i = 0; i < 9; i++) {
        let l = new Letter().at(i);
        switch (true) {
            case (l.centerMiddle() == ' ' && l.centerBottom() == '_'):
                result = result * 10 + 0;
                break;
            case (l.centerTop() == ' ' && l.centerMiddle() == ' '):
                result = result * 10 + 1;
                break;
            case (l.rightBottom() == ' '):
                result = result * 10 + 2;
                break;
            case (l.leftMiddle() == '|' && l.centerTop() == ' '):
                result = result * 10 + 4;
                break;
            case (l.centerBottom() == ' ' && l.centerTop() == '_'):
                result = result * 10 + 7;
                break;
            case (l.leftBottom() == ' ' && l.leftMiddle() == ' '):
                result = result * 10 + 3;
                break;
            case (l.leftBottom() == ' ' && l.rightMiddle() == ' '):
                result = result * 10 + 5;
                break;
            case (l.leftBottom() == ' ' && l.rightMiddle() == '|'):
                result = result * 10 + 9;
                break;
            case (l.rightMiddle() == ' '):
                result = result * 10 + 6;
                break;
            default:
                result = result * 10 + 8;
        }
    }
    return result;
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    var a = text.split(' ');
    var result = '';
    while (a.length > 0) {
        if (result.length - 1 + a[0].length < columns) {
            result += a.shift() + ' ';
        } else {
            yield result.slice(0, -1);
            result = '';
        }
    }
    if (result.length > 0) {
        yield result.slice(0, -1);
    }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
};

function getPokerHandRank(hand) {
    var suitS = '♥♦♣♠';
    var rankS = '234567891JQKA';

    function getSuit(string) {
        return string.slice(-1);
    }

    function getRank(string) {
        return string.slice(0, 1);
    }

    var a = hand.slice().sort(function (a, b) {
        return rankS.indexOf(getRank(a)) - rankS.indexOf(getRank(b));
    });
    var last = a.length - 1;

    function hasFlush(a) {
        let tmp=a.slice().sort(function (a, b) {
            return suitS.indexOf(getSuit(a)) - suitS.indexOf(getSuit(b));
        });
        return getSuit(tmp[0]) == getSuit(tmp[last]);
    }

    function hasStraight(a) {
        if (getRank(a[last]) == 'A') {
            let low = getRank(a[0]) == '2' && getRank(a[1]) == '3' && getRank(a[2]) == '4' && getRank(a[3]) == '5';
            let high = getRank(a[0]) == '1' && getRank(a[1]) == 'J' && getRank(a[2]) == 'Q' && getRank(a[3]) == 'K';
            return low || high;
        } else {
            let test = rankS.indexOf(getRank(a[0]));
            for (let i = 1; i <= last; i++) {
                if (++test != rankS.indexOf(getRank(a[i]))) {
                    return false;
                }
            }
            return true;
        }
    }

    function hasFourOfKind(a) {
        function firstFourEqual(ar) {
            return getRank(ar[0]) == getRank(ar[1]) &&
                getRank(ar[1]) == getRank(ar[2]) &&
                getRank(ar[2]) == getRank(ar[3]);
        }
        return firstFourEqual(a) || firstFourEqual(a.slice().reverse());
    }

    function hasFullHouse(a) {
        function twoPlusThree(arr) {
            return getRank(arr[0]) == getRank(arr[1]) &&
                getRank(arr[2]) == getRank(arr[3]) &&
                getRank(arr[3]) == getRank(arr[4]);
        }
        return twoPlusThree(a)||twoPlusThree(a.slice().reverse());
    }

    function hasThreeOfKind(a) {
        let v1 = getRank(a[0]) == getRank(a[1]) &&
            getRank(a[1]) == getRank(a[2]);
        let v2 = getRank(a[1]) == getRank(a[2]) &&
            getRank(a[2]) == getRank(a[3]);
        let v3 = getRank(a[2]) == getRank(a[3]) &&
            getRank(a[3]) == getRank(a[4]);
        return v1 || v2 || v3;
    }

    function hasTwoPairs(a) {
        let v1 = getRank(a[0]) == getRank(a[1]) &&
            getRank(a[2]) == getRank(a[3]);
        let v2 = getRank(a[0]) == getRank(a[1]) &&
            getRank(a[3]) == getRank(a[4]);
        let v3 = getRank(a[1]) == getRank(a[2]) &&
            getRank(a[3]) == getRank(a[4]);
        return v1 || v2 || v3;
    }

    function hasOnePair(a) {
        let v1 = getRank(a[0]) == getRank(a[1]);
        let v2 = getRank(a[1]) == getRank(a[2]);
        let v3 = getRank(a[2]) == getRank(a[3]);
        let v4 = getRank(a[3]) == getRank(a[4]);
        return v1 || v2 || v3 || v4;
    }

    switch (true) {
        case hasFlush(a) && hasStraight(a):
            return PokerRank.StraightFlush;
            break;
        case hasFourOfKind(a):
            return PokerRank.FourOfKind;
            break;
        case hasFullHouse(a):
            return PokerRank.FullHouse;
            break;
        case hasFlush(a):
            return PokerRank.Flush;
            break;
        case hasStraight(a):
            return PokerRank.Straight;
            break;
        case hasThreeOfKind(a):
            return PokerRank.ThreeOfKind;
            break;
        case hasTwoPairs(a):
            return PokerRank.TwoPairs;
            break;
        case hasOnePair(a):
            return PokerRank.OnePair;
            break;
        default:
            return PokerRank.HighCard
    }
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
    throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount: parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
