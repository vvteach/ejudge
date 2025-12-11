'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var MyVantagePlugin = /** @class */ (function (_super) {
    __extends(MyVantagePlugin, _super);
    function MyVantagePlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyVantagePlugin.prototype.onload = function () {
        var _this = this;
        console.log('Loading the Vantage plugin.');
        if (this.app.workspace.layoutReady) {
            this.onLayoutReady();
        }
        else {
            this.app.workspace.on("layout-ready", this.onLayoutReady.bind(this));
        }
        this.addCommand({
            id: 'build-search',
            name: "Build a new search",
            checkCallback: function (checking) {
                var leaf = _this.app.workspace.activeLeaf;
                if (leaf) {
                    if (!checking) {
                        new VantageModal(_this.app).open();
                    }
                    return true;
                }
                return false;
            }
        });
        this.addRibbonIcon('magnifying-glass', 'Vantage - Advanced search builder', function () {
            var leaf = _this.app.workspace.activeLeaf;
            if (leaf) {
                new VantageModal(_this.app).open();
                return true;
            }
            return false;
        });
        // this.addSettingTab(new SampleSettingTab(this.app, this));
    };
    MyVantagePlugin.prototype.onLayoutReady = function () {
        // Check for the Natural Language Dates plugin after all the plugins are loaded.
        // If not found, tell the user to install it/initialize it.
        var naturalLanguageDates = this.app.plugins.getPlugin('nldates-obsidian');
        if (!naturalLanguageDates) {
            new obsidian.Notice("The Natural Language Dates plugin was not found. The Vantage plugin requires the Natural Language Dates plugin. Please install it first and make sure it is updated and enabled before using Vantage.");
        }
    };
    MyVantagePlugin.prototype.onunload = function () {
        console.log('Unloading the Vantage plugin');
    };
    // getBacklinks(someFile: TFile) { // No longer used
    // 	let obsidianApp = this.app;
    // 	let allNotes = this.app.vault.getMarkdownFiles();
    // 	let currentBacklinks: Object[] = [];
    // 	allNotes.forEach((markdownFile: TFile) => {
    // 		this.app.metadataCache.getFileCache(markdownFile);
    // 		let thisMetadataCache = obsidianApp.metadataCache.getFileCache(markdownFile);
    // 		if (thisMetadataCache.links) {
    // 			for (let eachLink of thisMetadataCache.links) {
    // 				if (eachLink.link === currentFileName) {
    // 					currentBacklinks.push({noteName: markdownFile.basename, startPosition: eachLink.position.start, endPosition: eachLink.position.end});
    // 				}
    // 			}
    // 		}
    // 		if (thisMetadataCache.embeds) {
    // 			for (let eachEmbed of thisMetadataCache.embeds) {
    // 				if (eachEmbed.link.contains(currentFileName)) {
    // 					currentBacklinks.push({noteName: markdownFile.basename, startPosition: eachEmbed.position.start, endPosition: eachEmbed.position.end});
    // 				}
    // 			}
    // 		}
    // 	});
    // 	return currentBacklinks;
    // }
    MyVantagePlugin.prototype.delay = function (waittimeInMilliseconds) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(2);
            }, waittimeInMilliseconds);
        });
    };
    MyVantagePlugin.prototype.getSearch = function (someSearchQuery) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.app.internalPlugins.getPluginById('global-search').instance.openGlobalSearch(someSearchQuery);
                        return [4 /*yield*/, this.delay(5000)];
                    case 1:
                        _a.sent();
                        this.app.workspace.getLeavesOfType('search')[0].view.dom.resultDoms;
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyVantagePlugin;
}(obsidian.Plugin));
var VantageModal = /** @class */ (function (_super) {
    __extends(VantageModal, _super);
    function VantageModal(app) {
        return _super.call(this, app) || this;
    }
    VantageModal.prototype.onOpen = function () {
        var _this = this;
        var contentEl = this.contentEl;
        var searchModal = this;
        contentEl.parentElement.addClass("vantage-modal");
        var vantagePlugin = this.app.plugins.getPlugin("vantage-obsidian");
        var naturalLanguageDates = this.app.plugins.getPlugin('nldates-obsidian'); // Get the Natural Language Dates plugin.
        this.titleEl.setText("Vantage - Advanced Search");
        var vantageSettingsDiv = contentEl.createEl("div");
        var vantageSettingsDescriptionDiv = contentEl.createEl("div");
        vantageSettingsDescriptionDiv.addClass("setting-item");
        var vantageSettingsDescriptionSubdiv = contentEl.createEl("div");
        vantageSettingsDescriptionSubdiv.addClass("setting-item-info");
        var vantageSettingsDescription = contentEl.createEl("div", { "text": "Vantage helps create complex search queries. See Obsidian's search documentation for more." });
        vantageSettingsDescription.addClass("setting-item-description");
        var vantageSettingsDescriptionLink = contentEl.createEl("a", { "text": "https://publish.obsidian.md/help/Plugins/Search" });
        var vantageSettingsLinebreakDiv = contentEl.createEl("div");
        var vantageSettingsLinebreak = contentEl.createEl("br");
        vantageSettingsLinebreakDiv.append(vantageSettingsLinebreak);
        vantageSettingsLinebreakDiv.addClass("setting-item-description");
        vantageSettingsDescriptionLink.addClass("setting-item-description");
        vantageSettingsDescriptionLink.setAttr("href", "https://publish.obsidian.md/help/Plugins/Search");
        var vantageSettingsRegexDescription = contentEl.createEl("div", { "text": "Many complex searches use Regular Expressions. These help us search for patterns in our text. Visit RegExr to learn more and to practice with regular expressions." });
        vantageSettingsRegexDescription.addClass("setting-item-description");
        var vantageSettingsRegexLink = contentEl.createEl("a", { "text": "https://regexr.com/" });
        vantageSettingsRegexLink.setAttr("href", "https://regexr.com/");
        vantageSettingsRegexLink.addClass("setting-item-description");
        vantageSettingsDescriptionSubdiv.append(vantageSettingsDescription);
        vantageSettingsDescriptionSubdiv.append(vantageSettingsDescriptionLink);
        vantageSettingsDescriptionSubdiv.append(vantageSettingsLinebreakDiv);
        vantageSettingsDescriptionSubdiv.append(vantageSettingsRegexDescription);
        vantageSettingsDescriptionSubdiv.append(vantageSettingsRegexLink);
        vantageSettingsDescriptionDiv.append(vantageSettingsDescriptionSubdiv);
        vantageSettingsDiv.append(vantageSettingsDescriptionDiv);
        // Note attributes
        var noteAttributesHeadingDiv = contentEl.createEl("h2", { "text": "Search note attributes" });
        noteAttributesHeadingDiv.addClass("setting-item");
        noteAttributesHeadingDiv.addClass("setting-item-heading");
        vantageSettingsDiv.append(noteAttributesHeadingDiv);
        // Note Titles
        var noteTitleContainsDiv = contentEl.createEl("div");
        noteTitleContainsDiv.addClass("setting-item");
        var noteTitleInfoDiv = contentEl.createEl("div");
        noteTitleInfoDiv.addClass("setting-item-info");
        var noteTitleControlDiv = contentEl.createEl("div");
        noteTitleControlDiv.addClass("setting-item-control");
        var noteTitleContainsText = contentEl.createEl("span", { "text": "Note title contains: " });
        noteTitleContainsText.addClass("setting-item-name");
        var noteTitleContainsInput = contentEl.createEl("input", { "type": "text" });
        noteTitleContainsInput.id = "note-title-input";
        //noteTitleContainsInput.setAttr("style", "float: right; width: 50%");
        noteTitleInfoDiv.append(noteTitleContainsText);
        noteTitleControlDiv.append(noteTitleContainsInput);
        noteTitleContainsDiv.append(noteTitleInfoDiv);
        noteTitleContainsDiv.append(noteTitleControlDiv);
        vantageSettingsDiv.append(noteTitleContainsDiv);
        // Date range:
        var dateRangeDiv = contentEl.createEl("div");
        dateRangeDiv.addClass("setting-item");
        var dateRangeHeaderDiv = contentEl.createEl("div");
        dateRangeHeaderDiv.addClass("setting-item-info");
        var dateRangeHeader = contentEl.createEl("div", { "text": "Date range: " });
        dateRangeHeader.addClass("setting-item-name");
        var dateRangeSubtitle = contentEl.createEl("span", { "text": "(Entering data here will make the search include only daily notes (and may conflict with the above). Use natural language.)" });
        dateRangeSubtitle.setAttr("class", "setting-item-description");
        dateRangeHeaderDiv.append(dateRangeHeader);
        dateRangeHeaderDiv.append(dateRangeSubtitle);
        var startDateDiv = contentEl.createEl("div");
        var startDateInfoDiv = contentEl.createEl("div");
        startDateInfoDiv.addClass("setting-item-info");
        var startDateText = contentEl.createEl("div", { "text": "Start date: " });
        startDateText.addClass("setting-item-name");
        startDateInfoDiv.append(startDateText);
        var startDateControlDiv = contentEl.createEl("div");
        startDateControlDiv.addClass("setting-item-control");
        var fileStartDateInput = contentEl.createEl("input", { "type": "text" });
        startDateControlDiv.append(fileStartDateInput);
        startDateDiv.append(startDateInfoDiv);
        startDateDiv.append(startDateControlDiv);
        var endDateDiv = contentEl.createEl("div");
        var endDateInfoDiv = contentEl.createEl("div");
        endDateInfoDiv.addClass("setting-item-info");
        var endDateText = contentEl.createEl("div", { "text": "End date: " });
        endDateText.addClass("setting-item-name");
        endDateInfoDiv.append(endDateText);
        var endDateControlDiv = contentEl.createEl("div");
        endDateControlDiv.addClass("setting-item-control");
        var fileEndDateInput = contentEl.createEl("input", { "type": "text" });
        endDateControlDiv.append(fileEndDateInput);
        endDateDiv.append(endDateInfoDiv);
        endDateDiv.append(endDateControlDiv);
        dateRangeDiv.append(dateRangeHeaderDiv);
        dateRangeDiv.append(startDateDiv);
        dateRangeDiv.append(endDateDiv);
        vantageSettingsDiv.append(dateRangeDiv);
        // Tagged with
        var tagDiv = contentEl.createEl("div");
        tagDiv.addClass("setting-item");
        var tagInfoDiv = contentEl.createEl("div");
        var tagControlDiv = contentEl.createEl("div");
        tagInfoDiv.addClass("setting-item-info");
        tagControlDiv.addClass("setting-item-control");
        var noteTagText = contentEl.createEl("div", { "text": "Tagged with: " });
        noteTagText.addClass("setting-item-name");
        tagInfoDiv.append(noteTagText);
        var tagInput = contentEl.createEl("input", { "type": "text" });
        tagControlDiv.append(tagInput);
        tagDiv.append(tagInfoDiv);
        tagDiv.append(tagControlDiv);
        vantageSettingsDiv.append(tagDiv);
        // Notes with Path
        var notesPathDiv = contentEl.createEl("div");
        notesPathDiv.addClass("setting-item");
        var notesPathInfoDiv = contentEl.createEl("div");
        var notesPathControlDiv = contentEl.createEl("div");
        notesPathInfoDiv.addClass("setting-item-info");
        notesPathControlDiv.addClass("setting-item-control");
        var notesPathText = contentEl.createEl("div", { "text": "Notes in folder or path: " });
        notesPathText.addClass("setting-item-name");
        var notePathDescription = contentEl.createEl("span", { "text": "For example, include the folder to your Daily Notes to search all daily notes." });
        notePathDescription.setAttr("class", "setting-item-description");
        notesPathInfoDiv.append(notesPathText);
        notesPathInfoDiv.append(notePathDescription);
        var notesPathInput = contentEl.createEl("input", { "type": "text" });
        notesPathControlDiv.append(notesPathInput);
        notesPathDiv.append(notesPathInfoDiv);
        notesPathDiv.append(notesPathControlDiv);
        vantageSettingsDiv.append(notesPathDiv);
        // Note contents
        var noteContentsHeadingDiv = contentEl.createEl("h2", { "text": "Search note contents" });
        noteContentsHeadingDiv.addClass("setting-item");
        noteContentsHeadingDiv.addClass("setting-item-heading");
        vantageSettingsDiv.append(noteContentsHeadingDiv);
        contentEl.append(vantageSettingsDiv);
        var focusInputBox = contentEl.querySelector("#note-title-input");
        focusInputBox.focus();
        var queryDivs = contentEl.querySelectorAll("div");
        queryDivs.forEach(function (div) {
            var inputBoxes = div.querySelectorAll("input");
            inputBoxes.forEach(function (inputBox) {
                inputBox.addEventListener('keypress', function (keypressed) {
                    if (keypressed.key === 'Enter') {
                        initiateSearch();
                    }
                });
            });
        });
        function initiateSearch() {
            var searchQuery = setSearchQuery();
            searchModal.close();
            vantagePlugin.getSearch(searchQuery);
        }
        function processDateRange(startDate, endDate) {
            var parsedFileStartDate = naturalLanguageDates.parseDate(startDate);
            var parsedFileEndDate = naturalLanguageDates.parseDate(endDate);
            console.debug("Start date:" + parsedFileStartDate.formattedString + ". End date: " + parsedFileEndDate.formattedString + ".");
            // figure out if the user input dates in chronological or reverse-chronological order. e.g., did they write "yesterday" then "tomorrow," or "tomorrow" then "yesterday"?
            var dateDirection = "forward";
            if (parsedFileEndDate.moment.isAfter(parsedFileStartDate.moment)) {
                console.log("Dates go forward in time.");
                dateDirection = "forward";
            }
            else {
                dateDirection = "backward";
                console.log("Dates go backwards in time.");
            }
            // iterate through the dates from start to end, adding the title of each daily note to a string we'll use as a search query.
            var allDates = parsedFileStartDate.formattedString; // initialize the search query string
            var currentDate = parsedFileStartDate;
            while ((!(currentDate.formattedString === parsedFileEndDate.formattedString))) {
                var currentDateMoment = currentDate.moment;
                if (dateDirection == "forward") {
                    currentDateMoment = currentDateMoment.add(1, "days");
                }
                else {
                    currentDateMoment = currentDateMoment.subtract(1, "days");
                }
                var nextDate = naturalLanguageDates.parseDate(currentDateMoment.format("MMMM D YYYY"));
                allDates = allDates + " OR " + nextDate.formattedString;
                console.debug(currentDate + " === " + parsedFileEndDate.formattedString + ": " + (currentDate === parsedFileEndDate.formattedString));
                currentDate = nextDate;
            }
            return allDates;
        }
        function processTags(inputTags) {
            //split by spaces, then return each with tag: appended
            //if no #, add the # too
            var allTags = inputTags.split(" ");
            var processedTags = "";
            for (var _i = 0, allTags_1 = allTags; _i < allTags_1.length; _i++) {
                var eachTag = allTags_1[_i];
                if (eachTag.includes("#")) {
                    processedTags = processedTags + "tag:" + eachTag + " ";
                }
                else {
                    processedTags = processedTags + "tag:#" + eachTag + " ";
                }
            }
            processedTags = processedTags.trim();
            return processedTags;
        }
        function setSearchQuery() {
            var searchQuery = "";
            if (noteTitleContainsInput.value != "") {
                if ((fileStartDateInput.value != "") && (fileEndDateInput.value != "")) {
                    searchQuery = searchQuery + "file:(" + noteTitleContainsInput.value + processDateRange(fileStartDateInput.value, fileEndDateInput.value) + ") ";
                }
                else {
                    searchQuery = searchQuery + "file:(" + noteTitleContainsInput.value + ") ";
                }
            }
            else if ((fileStartDateInput.value != "") && (fileEndDateInput.value != "")) {
                searchQuery = searchQuery + "file:(" + processDateRange(fileStartDateInput.value, fileEndDateInput.value) + ") ";
            }
            if (tagInput.value != "") {
                searchQuery = searchQuery + "(" + processTags(tagInput.value) + ") ";
            }
            if (notesPathInput.value != "") {
                searchQuery = searchQuery + "path:(" + notesPathInput.value + ") ";
            }
            var newQueries = contentEl.querySelectorAll("div");
            newQueries.forEach(function (div) {
                if ((div.id.contains("AND")) || (div.id.contains("OR")) || (div.id.contains("NOT"))) {
                    var contentQuery = div.querySelectorAll("input");
                    var subquery_1 = contentQuery.item(0).value;
                    var selectBoxes = div.querySelectorAll("select");
                    selectBoxes.forEach(function (select) {
                        if (select.id.contains("Subtype")) {
                            if (select.value == "") ;
                            if (select.value.contains("link")) {
                                subquery_1 = "\\[\\[.*" + subquery_1 + ".*\\]\\]";
                            }
                            if (select.value.contains("email")) {
                                subquery_1 = "([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5})";
                            }
                            if (select.value.contains("phone")) {
                                subquery_1 = "[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*";
                            }
                        }
                    });
                    selectBoxes.forEach(function (select) {
                        if (select.id.contains("List")) {
                            if (select.value.contains("any")) {
                                if ((subquery_1.contains("[a-zA-Z0-9_")) || subquery_1.contains("}[0-9]")) {
                                    subquery_1 = "(/" + subquery_1 + "/)";
                                }
                            }
                            if (select.value.contains("list item")) {
                                subquery_1 = "(/- [^\[.\]].*" + subquery_1 + ".*/)";
                            }
                            if (select.value.contains("incomplete")) {
                                subquery_1 = "(/- \\[ \\].*" + subquery_1 + ".*/)";
                            }
                            if (select.value.contains("completed")) {
                                subquery_1 = "(/- \\[x\\].*" + subquery_1 + ".*/)";
                            }
                            if (select.value.contains("all")) {
                                subquery_1 = "(/- \\[.\\].*" + subquery_1 + ".*/)";
                            }
                        }
                    });
                    selectBoxes.forEach(function (select) {
                        if (select.id.contains("Type")) {
                            if (select.value.contains("note")) ;
                            if (select.value.contains("section")) {
                                subquery_1 = "section:" + subquery_1;
                            }
                            if (select.value.contains("block")) {
                                subquery_1 = "block:" + subquery_1;
                            }
                            if (select.value.contains("line")) {
                                subquery_1 = "line:" + subquery_1;
                            }
                        }
                    });
                    if (div.id.contains("AND")) {
                        console.log("This is an AND query");
                        searchQuery = searchQuery + " (" + subquery_1 + ")";
                    }
                    else if (div.id.contains("OR")) {
                        console.log("This is an OR query");
                        searchQuery = searchQuery + " OR (" + subquery_1 + ")";
                    }
                    else if (div.id.contains("NOT")) {
                        console.log("This is a NOT query");
                        searchQuery = searchQuery + " -(" + subquery_1 + ")";
                    }
                }
            });
            return searchQuery;
        }
        var vantageButtonsDiv = contentEl.createEl("div");
        vantageButtonsDiv.addClass("setting-item");
        var vantageButtonsControlDiv = contentEl.createEl("div");
        vantageButtonsControlDiv.addClass("setting-item-control");
        var vantageAddedQueriesDiv = contentEl.createEl("div");
        vantageSettingsDiv.append(vantageAddedQueriesDiv);
        var queryCount = 1;
        new obsidian.ButtonComponent(vantageSettingsDiv)
            .setButtonText("Add an AND search token")
            .setClass("mod-cta")
            .onClick(function () {
            var newQueryDiv = contentEl.createEl("div");
            newQueryDiv.addClass("setting-item");
            newQueryDiv.setAttr("id", "AND query" + queryCount);
            var newQueryInfoDiv = contentEl.createEl("div");
            newQueryInfoDiv.addClass("setting-item-info");
            var newQueryControlDiv = contentEl.createEl("div");
            newQueryControlDiv.addClass("setting-item-control");
            var newQuerySentenceStart = contentEl.createEl("div", { "text": "AND search⠀" });
            newQueryControlDiv.append(newQuerySentenceStart);
            // choose query type
            var queryType = contentEl.createEl("select");
            queryType.setAttr("class", "dropdown");
            queryType.multiple;
            //queryType.setAttr("style", "float: right;");
            queryType.setAttr("id", "Additional Query Type " + queryCount);
            var defaultTypeOption = contentEl.createEl("option", { "value": "note", "text": "notes" });
            defaultTypeOption.selected;
            queryType.append(defaultTypeOption);
            queryType.append(contentEl.createEl("option", { "value": "section", "text": "sections" }));
            queryType.append(contentEl.createEl("option", { "value": "block", "text": "blocks" }));
            queryType.append(contentEl.createEl("option", { "value": "line", "text": "lines" }));
            newQueryControlDiv.append(queryType);
            var newQueryForText = contentEl.createEl("div", { "text": "⠀for⠀" });
            newQueryControlDiv.append(newQueryForText);
            // choose list type
            var listType = contentEl.createEl("select");
            listType.setAttr("class", "dropdown");
            listType.multiple;
            //listType.setAttr("style", "float: right;");
            listType.setAttr("id", "Additional Query List Type " + queryCount);
            var defaultListTypeOption = contentEl.createEl("option", { "value": "any", "text": "any line type" });
            defaultListTypeOption.selected;
            listType.append(defaultListTypeOption);
            listType.append(contentEl.createEl("option", { "value": "list item", "text": "list items" }));
            listType.append(contentEl.createEl("option", { "value": "incomplete tasks", "text": "incomplete tasks" }));
            listType.append(contentEl.createEl("option", { "value": "completed tasks", "text": "completed tasks" }));
            listType.append(contentEl.createEl("option", { "value": "all tasks", "text": "all tasks" }));
            newQueryControlDiv.append(listType);
            // choose query subtype
            var querySubtype = contentEl.createEl("select");
            querySubtype.setAttr("class", "dropdown");
            querySubtype.multiple;
            querySubtype.setAttr("id", "Additional Query Subtype " + queryCount);
            // querySubtype.setAttr("style", "float: right;");
            var defaultSubtypeOption = contentEl.createEl("option", { "value": "", "text": "with text containing" });
            defaultSubtypeOption.selected;
            querySubtype.append(defaultSubtypeOption);
            querySubtype.append(contentEl.createEl("option", { "value": "with a link to notes with names containing", "text": "with links to notes with names containing" }));
            querySubtype.append(contentEl.createEl("option", { "value": "with an email address", "text": "with email addresses (ignores the following search field)" }));
            querySubtype.append(contentEl.createEl("option", { "value": "with a phone number", "text": "with phone numbers (ignores the following search field)" }));
            newQueryControlDiv.append(querySubtype);
            var newQuery = contentEl.createEl("input", { "type": "text" });
            newQuery.setAttr("id", "AND query " + queryCount);
            queryCount = queryCount + 1;
            newQueryControlDiv.append(newQuery);
            newQueryDiv.append(newQueryInfoDiv);
            newQueryDiv.append(newQueryControlDiv);
            vantageAddedQueriesDiv.append(newQueryDiv);
            var inputBoxes = vantageAddedQueriesDiv.querySelectorAll("input");
            inputBoxes.forEach(function (inputBox) {
                inputBox.addEventListener('keypress', function (keypressed) {
                    if (keypressed.key === 'Enter') {
                        initiateSearch();
                    }
                });
            });
            var optionBoxes = vantageAddedQueriesDiv.querySelectorAll("select");
            optionBoxes.forEach(function (optionBox) {
                optionBox.addEventListener('keypress', function (keypressed) {
                    if (keypressed.key === 'Enter') {
                        initiateSearch();
                    }
                });
            });
        });
        new obsidian.ButtonComponent(vantageSettingsDiv)
            .setButtonText("Add an OR search token")
            .setClass("mod-cta")
            .onClick(function () {
            var newQueryDiv = contentEl.createEl("div");
            newQueryDiv.addClass("setting-item");
            newQueryDiv.setAttr("id", "OR query" + queryCount);
            var newQueryInfoDiv = contentEl.createEl("div");
            newQueryInfoDiv.addClass("setting-item-info");
            // let newQueryTextLabel = contentEl.createEl("div", {"text":"OR search ..."});
            // newQueryInfoDiv.append(newQueryTextLabel);
            var newQueryControlDiv = contentEl.createEl("div");
            newQueryControlDiv.addClass("setting-item-control");
            var newQuerySentenceStart = contentEl.createEl("div", { "text": "OR search⠀" });
            newQueryControlDiv.append(newQuerySentenceStart);
            // choose query type
            var queryType = contentEl.createEl("select");
            queryType.setAttr("class", "dropdown");
            queryType.multiple;
            //queryType.setAttr("style", "float: right;");
            queryType.setAttr("id", "Additional Query Type " + queryCount);
            var defaultTypeOption = contentEl.createEl("option", { "value": "note", "text": "notes" });
            defaultTypeOption.selected;
            queryType.append(defaultTypeOption);
            queryType.append(contentEl.createEl("option", { "value": "section", "text": "sections" }));
            queryType.append(contentEl.createEl("option", { "value": "block", "text": "blocks" }));
            queryType.append(contentEl.createEl("option", { "value": "line", "text": "lines" }));
            newQueryControlDiv.append(queryType);
            var newQueryForText = contentEl.createEl("div", { "text": "⠀for⠀" });
            newQueryControlDiv.append(newQueryForText);
            // choose list type
            var listType = contentEl.createEl("select");
            listType.setAttr("class", "dropdown");
            listType.multiple;
            //listType.setAttr("style", "float: right;");
            listType.setAttr("id", "Additional Query List Type " + queryCount);
            var defaultListTypeOption = contentEl.createEl("option", { "value": "any", "text": "any line type" });
            defaultListTypeOption.selected;
            listType.append(defaultListTypeOption);
            listType.append(contentEl.createEl("option", { "value": "list item", "text": "list items" }));
            listType.append(contentEl.createEl("option", { "value": "incomplete tasks", "text": "incomplete tasks" }));
            listType.append(contentEl.createEl("option", { "value": "completed tasks", "text": "completed tasks" }));
            listType.append(contentEl.createEl("option", { "value": "all tasks", "text": "all tasks" }));
            newQueryControlDiv.append(listType);
            // choose query subtype
            var querySubtype = contentEl.createEl("select");
            querySubtype.setAttr("class", "dropdown");
            querySubtype.multiple;
            querySubtype.setAttr("id", "Additional Query Subtype " + queryCount);
            // querySubtype.setAttr("style", "float: right;");
            var defaultSubtypeOption = contentEl.createEl("option", { "value": "", "text": "with text containing" });
            defaultSubtypeOption.selected;
            querySubtype.append(defaultSubtypeOption);
            querySubtype.append(contentEl.createEl("option", { "value": "with a link to notes with names containing", "text": "with links to notes with names containing" }));
            querySubtype.append(contentEl.createEl("option", { "value": "with an email address", "text": "with email addresses (ignores the following search field)" }));
            querySubtype.append(contentEl.createEl("option", { "value": "with a phone number", "text": "with phone numbers (ignores the following search field)" }));
            newQueryControlDiv.append(querySubtype);
            var newQuery = contentEl.createEl("input", { "type": "text" });
            newQuery.setAttr("id", "OR query " + queryCount);
            queryCount = queryCount + 1;
            newQueryControlDiv.append(newQuery);
            newQueryDiv.append(newQueryInfoDiv);
            newQueryDiv.append(newQueryControlDiv);
            vantageAddedQueriesDiv.append(newQueryDiv);
            var inputBoxes = vantageAddedQueriesDiv.querySelectorAll("input");
            inputBoxes.forEach(function (inputBox) {
                inputBox.addEventListener('keypress', function (keypressed) {
                    if (keypressed.key === 'Enter') {
                        initiateSearch();
                    }
                });
            });
            var optionBoxes = vantageAddedQueriesDiv.querySelectorAll("select");
            optionBoxes.forEach(function (optionBox) {
                optionBox.addEventListener('keypress', function (keypressed) {
                    if (keypressed.key === 'Enter') {
                        initiateSearch();
                    }
                });
            });
        });
        new obsidian.ButtonComponent(vantageSettingsDiv)
            .setButtonText("Add a NOT search token")
            .setClass("mod-cta")
            .onClick(function () {
            var newQueryDiv = contentEl.createEl("div");
            newQueryDiv.addClass("setting-item");
            newQueryDiv.setAttr("id", "NOT query" + queryCount);
            var newQueryInfoDiv = contentEl.createEl("div");
            newQueryInfoDiv.addClass("setting-item-info");
            var newQueryControlDiv = contentEl.createEl("div");
            newQueryControlDiv.addClass("setting-item-control");
            var newQuerySentenceStart = contentEl.createEl("div", { "text": "NOT search⠀" });
            newQueryControlDiv.append(newQuerySentenceStart);
            // choose query type
            var queryType = contentEl.createEl("select");
            queryType.setAttr("class", "dropdown");
            queryType.multiple;
            //queryType.setAttr("style", "float: right;");
            queryType.setAttr("id", "Additional Query Type " + queryCount);
            var defaultTypeOption = contentEl.createEl("option", { "value": "note", "text": "notes" });
            defaultTypeOption.selected;
            queryType.append(defaultTypeOption);
            queryType.append(contentEl.createEl("option", { "value": "section", "text": "sections" }));
            queryType.append(contentEl.createEl("option", { "value": "block", "text": "blocks" }));
            queryType.append(contentEl.createEl("option", { "value": "line", "text": "lines" }));
            newQueryControlDiv.append(queryType);
            var newQueryForText = contentEl.createEl("div", { "text": "⠀for⠀" });
            newQueryControlDiv.append(newQueryForText);
            // choose list type
            var listType = contentEl.createEl("select");
            listType.setAttr("class", "dropdown");
            listType.multiple;
            //listType.setAttr("style", "float: right;");
            listType.setAttr("id", "Additional Query List Type " + queryCount);
            var defaultListTypeOption = contentEl.createEl("option", { "value": "any", "text": "any line type" });
            defaultListTypeOption.selected;
            listType.append(defaultListTypeOption);
            listType.append(contentEl.createEl("option", { "value": "list item", "text": "list items" }));
            listType.append(contentEl.createEl("option", { "value": "incomplete tasks", "text": "incomplete tasks" }));
            listType.append(contentEl.createEl("option", { "value": "completed tasks", "text": "completed tasks" }));
            listType.append(contentEl.createEl("option", { "value": "all tasks", "text": "all tasks" }));
            newQueryControlDiv.append(listType);
            // choose query subtype
            var querySubtype = contentEl.createEl("select");
            querySubtype.setAttr("class", "dropdown");
            querySubtype.multiple;
            querySubtype.setAttr("id", "Additional Query Subtype " + queryCount);
            // querySubtype.setAttr("style", "float: right;");
            var defaultSubtypeOption = contentEl.createEl("option", { "value": "", "text": "with text containing" });
            defaultSubtypeOption.selected;
            querySubtype.append(defaultSubtypeOption);
            querySubtype.append(contentEl.createEl("option", { "value": "with a link to notes with names containing", "text": "with links to notes with names containing" }));
            querySubtype.append(contentEl.createEl("option", { "value": "with an email address", "text": "with email addresses (ignores the following search field)" }));
            querySubtype.append(contentEl.createEl("option", { "value": "with a phone number", "text": "with phone numbers (ignores the following search field)" }));
            newQueryControlDiv.append(querySubtype);
            var newQuery = contentEl.createEl("input", { "type": "text" });
            newQuery.setAttr("id", "NOT query " + queryCount);
            queryCount = queryCount + 1;
            newQueryControlDiv.append(newQuery);
            newQueryDiv.append(newQueryInfoDiv);
            newQueryDiv.append(newQueryControlDiv);
            vantageAddedQueriesDiv.append(newQueryDiv);
            var inputBoxes = vantageAddedQueriesDiv.querySelectorAll("input");
            inputBoxes.forEach(function (inputBox) {
                inputBox.addEventListener('keypress', function (keypressed) {
                    if (keypressed.key === 'Enter') {
                        initiateSearch();
                    }
                });
            });
            var optionBoxes = vantageAddedQueriesDiv.querySelectorAll("select");
            optionBoxes.forEach(function (optionBox) {
                optionBox.addEventListener('keypress', function (keypressed) {
                    if (keypressed.key === 'Enter') {
                        initiateSearch();
                    }
                });
            });
        });
        new obsidian.ButtonComponent(vantageButtonsControlDiv)
            .setButtonText("Create embedded search")
            .setClass("mod-cta")
            .onClick(function () {
            var embeddedSearchQueryHeader = "```query\n";
            var embeddedSearchQueryFooter = "\n```";
            var embeddedSearchQuery;
            fileStartDateInput.removeAttribute("style");
            fileEndDateInput.removeAttribute("style");
            if ((fileStartDateInput.value != "") && (fileEndDateInput.value != "")) { // If both date fields have values, the user is trying to search daily notes
                var parsedFileStartDate = naturalLanguageDates.parseDate(fileStartDateInput.value);
                var parsedFileEndDate = naturalLanguageDates.parseDate(fileEndDateInput.value);
                if (parsedFileStartDate.formattedString.contains("Invalid")) { // if the start date cannot be processed, let the user know
                    console.log("Start date could not be processed.");
                    new obsidian.Notice("Sorry, something seems to be wrong with that start date.");
                    fileStartDateInput.setAttr("style", "border-color: var(--background-modifier-error); border-width: .1em;");
                }
                if (parsedFileEndDate.formattedString.contains("Invalid")) { // if the end date cannot be processed, let the user know
                    console.log("End date could not be processed.");
                    new obsidian.Notice("Sorry, something seems to be wrong with that end date.");
                    fileEndDateInput.setAttr("style", "border-color: var(--background-modifier-error); border-width: .1em;");
                }
                if (!(parsedFileStartDate.formattedString.contains("Invalid")) && !(parsedFileEndDate.formattedString.contains("Invalid"))) { // otherwise go ahead with the search
                    embeddedSearchQuery = embeddedSearchQueryHeader + setSearchQuery() + embeddedSearchQueryFooter;
                    // let doc = this.app.workspace.activeLeaf.view.sourceMode.cmEditor.getDoc();
                    var view = _this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                    if (!view) {
                        new obsidian.Notice("No editable document is open. Perhaps you meant to click \"New search\"?");
                        return;
                    }
                    _this.close();
                    var doc = view.sourceMode.cmEditor.getDoc();
                    var cursor = doc.getCursor();
                    doc.replaceRange(embeddedSearchQuery, cursor);
                }
            }
            else { // no dates have been entered, so the search can continue
                embeddedSearchQuery = embeddedSearchQueryHeader + setSearchQuery() + embeddedSearchQueryFooter;
                var view = _this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                if (!view) {
                    new obsidian.Notice("No editable document is open. Perhaps you meant to click \"New search\"?");
                    return;
                }
                _this.close();
                var doc = view.sourceMode.cmEditor.getDoc();
                var cursor = doc.getCursor();
                doc.replaceRange(embeddedSearchQuery, cursor);
            }
        });
        new obsidian.ButtonComponent(vantageButtonsControlDiv)
            .setButtonText("New search")
            .setClass("mod-cta")
            .onClick(function () {
            fileStartDateInput.removeAttribute("style");
            fileEndDateInput.removeAttribute("style");
            if ((fileStartDateInput.value != "") && (fileEndDateInput.value != "")) { // If both date fields have values, the user is trying to search daily notes
                var parsedFileStartDate = naturalLanguageDates.parseDate(fileStartDateInput.value);
                var parsedFileEndDate = naturalLanguageDates.parseDate(fileEndDateInput.value);
                if (parsedFileStartDate.formattedString.contains("Invalid")) { // if the start date cannot be processed, let the user know
                    console.log("Start date could not be processed.");
                    new obsidian.Notice("Sorry, something seems to be wrong with that start date.");
                    fileStartDateInput.setAttr("style", "border-color: var(--background-modifier-error); border-width: .1em;");
                    return;
                }
                if (parsedFileEndDate.formattedString.contains("Invalid")) { // if the end date cannot be processed, let the user know
                    console.log("End date could not be processed.");
                    new obsidian.Notice("Sorry, something seems to be wrong with that end date.");
                    fileEndDateInput.setAttr("style", "border-color: var(--background-modifier-error); border-width: .1em;");
                    return;
                }
                if (!(parsedFileStartDate.formattedString.contains("Invalid")) && !(parsedFileEndDate.formattedString.contains("Invalid"))) { // otherwise go ahead with the search
                    initiateSearch();
                }
            }
            else { // no dates have been entered, so the search can continue
                initiateSearch();
            }
        });
        vantageButtonsDiv.append(vantageButtonsControlDiv);
        vantageSettingsDiv.append(vantageButtonsDiv);
    };
    VantageModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return VantageModal;
}(obsidian.Modal));
// class SampleSettingTab extends PluginSettingTab {
// 	display(): void {
// 		let {containerEl} = this;
// 		containerEl.empty();
// 		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});
// 		new Setting(containerEl)
// 			.setName('Setting #1')
// 			.setDesc('It\'s a secret')
// 			.addText(text => text.setPlaceholder('Enter your secret')
// 				.setValue('')
// 				.onChange((value) => {
// 					console.log('Secret: ' + value);
// 				}));
// 	}
// }

module.exports = MyVantagePlugin;


/* nosourcemap */