//=============================================================================
// HO_AchievementSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.HO_AchievementSystem = true;

var Horsti = Horsti || {};
Horsti.AS = {};
Horsti.AS.version = "1.2";

//=============================================================================
/*:
 * @plugindesc v1.2 Achievement System for RPG Maker MV
 * @author Horst Onager
 * 
 * @param --- Data ---
 * @default
 * 
 * @param Achievement List
 * @parent --- Data ---
 * @type struct<Achievement>[]
 * @desc List of all achievements.
 * @default []
 *
 * @param Category List
 * @parent --- Data ---
 * @type struct<AchievementCategory>[]
 * @desc List of all achievement categories.
 * @default ["{\"Title\":\"All\",\"Description\":\"\\\"This is the \\\\\\\\c[4]default\\\\\\\\c[0] category\\\\ndescription.\\\"\",\"Visible\":\"true\"}","{\"Title\":\"Rewards\",\"Description\":\"\\\"Complete achievements and \\\\ngain achievement points to \\\\nget these rewards!\\\"\",\"Visible\":\"true\"}"]
 *
 * @param Reward List
 * @parent --- Data ---
 * @type struct<AchievementPointReward>[]
 * @desc List of rewards that will be rewarded for reaching
 * certain amounts of achievement points.
 * @default ["{\"Points\":\"1\",\"Gold\":\"50\",\"Experience\":\"50\",\"Items\":\"[]\",\"Weapons\":\"[]\",\"Armors\":\"[]\",\"Custom\":\"[]\"}"]
 *
 * @param --- General ---
 * @default
 *
 * @param Achievement Points
 * @parent --- General ---
 * @type boolean
 * @on Use
 * @off Don't use
 * @desc Use the achievement points mechanic?
 * @default true
 *
 * @param Achievement Rewards
 * @parent --- General ---
 * @type boolean
 * @on Yes
 * @off No
 * @desc Reward gold, items, etc. for achievements or achievement points?
 * @default true
 *
 * @param Reward Distribution
 * @parent --- General ---
 * @type boolean
 * @on Distribute
 * @off Don't distribute
 * @desc Distribute rewards upon completion, or just show them in the menu?
 * @default true
 *
 * @param Rewards Category Index
 * @parent --- General ---
 * @type number
 * @desc Index of the rewards category. Set to 0 if you don't want to use this.
 * @default 2
 *
 * @param Silent Completion
 * @parent --- General ---
 * @type boolean
 * @on Don't show/reveal
 * @off Show/reveal
 * @desc Do NOT automatically show/reveal achievements upon completion?
 * @default false
 *
 * @param --- Menu Command ---
 * @default
 *
 * @param Command Name
 * @parent --- Menu Command ---
 * @desc This is the command that will appear in the menu.
 * @default Achievements
 * 
 * @param Enabled?
 * @parent --- Menu Command ---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Achievements command in the main menu by default?
 * @default true
 *
 * @param Visible?
 * @parent --- Menu Command ---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the Achievements command in the main menu by default?
 * @default true
 *
 * @param --- Scene ---
 * @default
 *
 * @param Scene Background
 * @parent --- Scene ---
 * @type file
 * @dir img/pictures/
 * @desc Background image used for the scene. Leave empty for the
 * default blurry background.
 * @default
 * 
 * @param --- Title Window ---
 * @default
 *
 * @param Title Width
 * @parent --- Title Window ---
 * @desc Width of the achievement title window.
 * @default Graphics.boxWidth
 *
 * @param Title Height
 * @parent --- Title Window ---
 * @desc Width of the achievement title window.
 * Default: this.fittingHeight(1)
 * @default this.fittingHeight(1)
 *
 * @param Title X
 * @parent --- Title Window ---
 * @desc X position of the achievement title window.
 * @default 0
 *
 * @param Title Y
 * @parent --- Title Window ---
 * @desc Y Position of the achievement title window.
 * @default 0
 *
 * @param Title Vocab
 * @parent --- Title Window ---
 * @desc The text that is displayed in the title window.
 * Text codes allowed.
 * @default \c[23]Achievements
 *
 * @param Title Align
 * @parent --- Title Window ---
 * @type select
 * @option Left
 * @value Left
 * @option Center
 * @value Center
 * @option Right
 * @value Right
 * @desc The align of the title text.
 * @default Center
 *
 * @param Total Points Vocab
 * @parent --- Title Window ---
 * @desc The text displaying the player's total amount of achievement points. %1: Amount
 * @default %1\i[163]
 *
 * @param --- List Window ---
 * @default
 *
 * @param List Width
 * @parent --- List Window ---
 * @desc Width of the achievement list window.
 * @default Graphics.boxWidth / 3 + 16
 *
 * @param List Height
 * @parent --- List Window ---
 * @desc Height of the achievement list window.
 * Default: Graphics.boxHeight - this.fittingHeight(1)
 * @default Graphics.boxHeight - this.fittingHeight(1)
 *
 * @param List X
 * @parent --- List Window ---
 * @desc X position of the achievement list window.
 * @default 0
 *
 * @param List Y
 * @parent --- List Window ---
 * @desc Y Position of the achievement list window.
 * @default this.fittingHeight(1)
 *
 * @param Collapsed Prefix
 * @parent --- List Window ---
 * @desc The text that is prepended to collapsed categories.
 * @default \i[187]
 *
 * @param Expanded Prefix
 * @parent --- List Window ---
 * @desc The text that is prepended to expanded categories.
 * @default \i[189]
 *
 * @param Concealed Achievement Vocab
 * @parent --- List Window ---
 * @desc Text that should be used for concealed achievements. Codes allowed. %1: Achievement Title
 * @default \i[161]???
 *
 * @param Concealed Category Vocab
 * @parent --- List Window ---
 * @desc Text that should be used for concealed categories. Codes allowed. %1: Category Title
 * @default ???
 *
 * @param Achievement Indent
 * @parent --- List Window ---
 * @type number
 * @desc Amount of pixels achievements will be indented in the list.
 * @default 8
 *
 * @param Point Rewards Format
 * @parent --- List Window ---
 * @desc Format of the rewards listed.
 * %1: Amount of points needed.
 * @default \i[163]%1
 *
 * @param Point Rewards Completed Format
 * @parent --- List Window ---
 * @desc Format of the rewards listed.
 * %1: Amount of points needed.
 * @default \i[163]\c[21]%1
 *
 * @param --- Data Window ---
 * @default
 *
 * @param Data Width
 * @parent --- Data Window ---
 * @desc Width of the data window.
 * @default Graphics.boxWidth * 2 / 3 - 16
 *
 * @param Data Height
 * @parent --- Data Window ---
 * @desc Width of the data window.
 * Default: Graphics.boxHeight - this.fittingHeight(1)
 * @default Graphics.boxHeight - this.fittingHeight(1)
 *
 * @param Data X
 * @parent --- Data Window ---
 * @desc X position of the data window.
 * @default Graphics.boxWidth / 3 + 16
 *
 * @param Data Y
 * @parent --- Data Window ---
 * @desc Y position of the data window.
 * @default this.fittingHeight(1)
 *
 * @param Progress Display Mode
 * @parent --- Data Window ---
 * @type select
 * @option Current Total
 * @value 0
 * @option Current Tier
 * @value 1
 * @option Total
 * @value 2
 * @desc The way the progress bar should behave.
 * @default 0
 *
 * @param Progress Vocab
 * @parent --- Data Window ---
 * @desc Progress text that's displayed above the progress bar.
 * %1: Current Progress, %2: Tier, %3: Percentage
 * @default Progress: %1/%2 (%3%)
 *
 * @param Tier Vocab
 * @parent --- Data Window ---
 * @desc Tier text that's displayed above the progress bar.
 * %1: Current Tier, %2: Max Tier
 * @default Tier: %1/%2
 *
 * @param Point Vocab Next
 * @parent --- Data Window ---
 * @desc The text displaying the amount of points for the next tier. %1: Amount of Points.
 * @default Next Tier: %1\i[163]
 *
 * @param Point Vocab Total
 * @parent --- Data Window ---
 * @desc Text that's displayed when total points amount is limited. %1 Rewarded Points, %2: Total Points
 * @default %1/%2\i[163]
 *
 * @param Point Vocab Infinite
 * @parent --- Data Window ---
 * @desc Text that's displayed when total points amount is unlimited. %1 Rewarded Points
 * @default %1\i[163]
 *
 * @param Reward Vocab
 * @parent --- Data Window ---
 * @desc Text that's displayed at the top of the reward section.
 * %1: Current Tier, %2: Max Tier
 * @default \c[1]Reward
 *
 * @param Reward Format Gold
 * @parent --- Data Window ---
 * @desc Text that will be displayed for gold rewards.
 * %1: Amount
 * @default \i[313]\g: x%1
 *
 * @param Reward Format Experience
 * @parent --- Data Window ---
 * @desc Text that will be displayed for experience rewards.
 * %1: Amount
 * @default \i[79]Experience: x%1
 *
 * @param Reward Format Items
 * @parent --- Data Window ---
 * @desc Text that will be displayed for item/weapon/armor rewards.
 * %1: Icon Index, %2: Name, %3: Amount
 * @default \i[%1]%2: x%3
 *
 * @param Repeatable Vocab
 * @parent --- Data Window ---
 * @desc The text that will be displayed above the progress bar.
 * %1: Amount Repeated, %2: Max Amount Repeatable
 * @default Repeated: %1/%2
 *
 * @param Repeatable Vocab Infinite
 * @parent --- Data Window ---
 * @desc The text that will be displayed above the progress bar when the achievement is infnitely repeatable. %1: Amount Repeated
 * @default Repeated: %1
 *
 * @param Horizontal Line Color 1
 * @parent --- Data Window ---
 * @type number
 * @desc The first color of the horizontal separator line. This is a text color.
 * @default 1
 *
 * @param Horizontal Line Color 2
 * @parent --- Data Window ---
 * @type number
 * @desc The second color of the horizontal separator line. This is a text color.
 * @default 9
 *
 * @param --- Alert Window ---
 * @default
 *
 * @param Show Alert Window?
 * @parent --- Alert Window ---
 * @type boolean
 * @on Yes
 * @off No
 * @desc Automatically display an alert window whenever an achievement is unlocked?
 * @default true
 *
 * @param Show New Tier Alert?
 * @parent --- Alert Window ---
 * @type boolean
 * @on Yes
 * @off No
 * @desc Show the alert window when an achivement reaches a new tier?
 * @default true
 *
 * @param Show Reward Alert?
 * @parent --- Alert Window ---
 * @type boolean
 * @on Yes
 * @off No
 * @desc Show the alert window when the player receives an achievement point reward?
 * @default true
 *
 * @param Alert Width
 * @parent --- Alert Window ---
 * @desc Width of the alert window.
 * Default: Graphics.boxWidth / 2
 * @default Graphics.boxWidth / 2
 *
 * @param Alert X
 * @parent --- Alert Window ---
 * @desc X position of the alert window.
 * Default: Graphics.boxWidth / 4
 * @default Graphics.boxWidth / 4
 *
 * @param Alert Y
 * @parent --- Alert Window ---
 * @desc Y position of the alert window.
 * Default: 0
 * @default 0
 *
 * @param Alert Window Skin
 * @parent --- Alert Window ---
 * @type file
 * @dir img/system
 * @desc Window Skin of the alert window.
 * Default: Window
 * @default Window
 *
 * @param Alert Vocab Completion
 * @parent --- Alert Window ---
 * @desc The text that is displayed above the achievement title when
 * an achievement is completed.
 * @default Achievement Completed!
 *
 * @param Alert Vocab Progress
 * @parent --- Alert Window ---
 * @desc The text that is displayed above the achievement title when
 * an achivement reaches a new tier.
 * @default Achievement Progressed!
 *
 * @param Alert Vocab Achievement Reward
 * @parent --- Alert Window ---
 * @desc Additional text shown when the completed tier or achievement gives a reward.
 * @default Got Reward!
 *
 * @param Alert Vocab Point Reward
 * @parent --- Alert Window ---
 * @desc Additional text shown when the completed tier or achievement gives a reward.
 * @default Got Reward!
 *
 * @param Time Visible
 * @parent --- Alert Window ---
 * @type number
 * @desc Amount of frames the alert window stays open.
 * @default 120
 *
 * @param Alert Sound Name
 * @parent --- Alert Window ---
 * @type file
 * @dir audio/se/
 * @desc Name of the sound effect that is played when the alert window
 * pops up. Leave empty if you don't want a sound effect.
 * @default Absorb2
 *
 * @param Alert Sound Volume
 * @parent --- Alert Window ---
 * @type number
 * @min 0
 * @max 100
 * @desc Volume of the sound effect.
 * @default 90
 *
 * @param Alert Sound Pitch
 * @parent --- Alert Window ---
 * @type number
 * @min 50
 * @max 200
 * @desc Pitch of the sound effect.
 * @default 100
 *
 * @param Alert Sound Pan
 * @parent --- Alert Window ---
 * @type number
 * @min -100
 * @max 100
 * @desc Pan of the sound effect.
 * @default 0
 *
 * @help
 *=============================================================================
 * Achievement System v1.1
 *-----------------------------------------------------------------------------
 * Author: Horst Onager
 * Created: 2020-08-21
 *
 * Copyright (c) 2020 Horst Onager
 *
 * This plugin is licensed under the MIT license. For more info please
 * visit this site: 
 *
 * https://github.com/horstonager/rmmv-plugins/blob/master/LICENSE
 *
 *=============================================================================
 * 
 * Requires RPG Maker MV version 1.5.0 or higher.
 * 
 *=============================================================================
 * How to use
 *=============================================================================
 * 
 * This plugin adds an achievement system into your game! Achievements can 
 * reward gold, items, weapons, armor and achievement points. Rewards can
 * also be bound to achievement points. When the player accomplishes an
 * achievement or reaches a new tier, an alert window will pop up on the map
 * to inform the player about their feat.
 *
 * Please note that due to the way the data is stored, shifting achievements,
 * categories or rewards around in their respective lists can cause unexpected
 * behaviour since achievement data is stored depending on the index.
 * 
 *
 *=============================================================================
 * Plugin Commands
 *=============================================================================
 * 
 *   Achievements Open
 *   Opens the achievements overview scene.
 * 
 *   Achievements Show
 *   Achievements Hide
 *   Shows or hides the "Achievements" command from the menu.
 *   Script Call: $gameSystem.setAchievementVisibility(true/false);
 * 
 *   Achievements Enable
 *   Achievements Disable
 *   Enables or disables the "Achievements" command in the menu.
 *   Script Call: $gameSystem.setAchievementAvailability(true/false);
 * 
 *   Achievement x Show
 *   Achievement x Hide
 *   Show or hide the achievement with index x in the achievement list.
 *   Hidden achievements will not appear in the achievement list at all.
 *   Script Call: $gameParty.achievement(x).show();
 *                $gameParty.achievement(x).hide();
 *
 *   Achievement x Reveal
 *   Achievement x Conceal
 *   Reveal or conceal the achievement with index x in the achievement 
 *   list. A concealed achievement will appear in the achievement list,
 *   but without a description and will use the text specified in the
 *   parameter 'Concealed Text' instead of its title.
 *   Script Call: $gameParty.achievement(x).reveal();
 *                $gameParty.achievement(x).conceal();
 *
 *   Achievement x Set y Progress
 *   Achievement x Add y Progress
 *   Either set the progress of the achievement with index x to y or
 *   add y to it. Once an achievement's progress has reached its highest
 *   tier goal, it is automatically completed and set visible (if silent
 *   completion id turned off).
 *   Script Call: $gameParty.achievement(x).setProgress(y);
 *                $gameParty.achievement(x).addProgress(y);
 * 
 *   Achievement Category x Show
 *   Achievement Category x Hide
 *   Show or hide the whole achievement category with index x in the
 *   achievement list.
 *   Script Call: $gameParty.achievementCategory(x).show();
 *                $gameParty.achievementCategory(y).hide();
 *                (x is the index in this case).
 *
 *   Achievement Category x Reveal
 *   Achievement Category x Conceal
 *   Reveal or conceal the achievement category. Concealed categories
 *   will be visible in the achievement list window, but will only
 *   have the concealed text as their name and no description, and
 *   the player will not be able to expand them.
 *   Script Call: $gameParty.achievementCategory(x).reveal();
 *                $gameParty.achievementCategory(y).conceal();
 *                (x is the index in this case).
 *
 *   Achievement x Add Category y
 *   Add achievement x to category y. x is the achievement's index,
 *   y the category's title or index.
 *   Script Call: $gameParty.achievement(x).addCategory(y);
 *
 *   Achievement x Set Category y
 *   Set the category of achievement x to y. y must only be a single
 *   category. x is the achievement's index, y the category's title
 *   or index.
 *   Script Call: $gameParty.achievement(x).setCategories(y);
 *  
 *   Achievement x Remove Category y
 *   Remove achievement x from category y. x is the achievement's index,
 *   y the category's title or index.
 *   Script Call: $gameParty.achievement(x).removeCategory(y);
 *
 *   Achievement Alerts Enabled
 *   Achievement Alerts Disabled
 *   Enable or disable the achievement alert window.
 *   Script Call: $gameSystem.setAchievementAlertAvailability(true/false);
 *
 *
 *=============================================================================
 * Script Calls
 *=============================================================================
 *
 * In addition to the plugin commands, there are also some script calls you
 * can use for more granular control over the achievements and the plugin
 * behaviour mid game. You could also incorporate these into YEP_OptionsCore
 * for the player to freely toggle them.
 *
 *
 *   $gameSystem.setAchievementProgressAlertAvailability(true/false);
 *   Enable or disable achievement alerts specifically for reaching a new
 *   achievement tier.
 *
 *   $gameSystem.setAchievementPointRewardAlertAvailability(true/false);
 *   Enable or disable achievement alerts specifically for achievement point
 *   rewards.
 *
 *   $gameSystem.setSilentAchievementCompletion(true/false);
 *   Enable or disable silent achievement completion.
 *
 *   $gameSystem.setProgressMode(0/1/2);
 *   Set the progress display mode.
 *   0: Current Total
 *   1: Current Tier
 *   2: Total
 *
 *   $gameParty.achievement(x)
 *   Returns the achievement with index x. From there, you can edit some of
 *   its attributes, if you're familiar with JS.
 *
 *   $gameParty.achievementCategory(x)
 *   Returns the category with index x. From there, you can edit some of
 *   its attributes, if you're familiar with JS.
 *
 *
 *=============================================================================
 * Plugin Parameters
 *=============================================================================
 *
 * There are a bunch of plugin parameters for this plugin for you to customize
 * it to your liking. The most important ones are the three at the top, the
 * Achievement List, Category List and Reward List. There You can create your
 * own achievements, achievement categories and achievement point rewards.
 *
 * Here's a detailed description of all the plugin parameters and parameter
 * structs.
 *
 *
 * Achievements
 *-----------------------------------------------------------------------------
 *
 * Title
 * This is the achievement's default title, by which it will be displayed in
 * the achievements list or the achievement alert. Text codes are allowed
 * here, so you could put any icon in the title, like shown in the default
 * setting.
 * 
 * Completed Title
 * This is the achievement's title when it is completed. Text codes are
 * allowed. %1: Regular Title
 * Default: \c[21]%1
 * 
 * Description
 * The achievements description. Use this to describe what the player has to
 * do to accomplish the achievement. This does NOT support word wrapping, so
 * you will have to determine yourself how far to right you can go per line.
 * Text codes are allowed.
 * %1: Current tier goal, %2: Max tier goal.
 * 
 * Tiers
 * Tiers are a way to break up one large achievement into several smaller
 * or simpler ones. One example would be to have the player kill just one
 * enemy for the first tier, then 5 for second, and at 10 enemies the
 * achievement will be completed. Each tier has a Progress parameter and a
 * Points parameter. Progress determines how much progress is needed in
 * total to complete the tier, Points is the amount of achievement points
 * the player will get once the tier is completed.
 *
 * Categories
 * The categories the achievement will appear in in the achievement list.
 * You can use the categories' names or indices, or mix both (although I
 * advise against that).
 * 
 * Concealed
 * This determines if the achievements will be concealed, meaning
 * that it will appear in the achievement list, but instead of its
 * title, the text specified in the parameter 'Concealed Text'
 * will be used. The description will also not be displayed.
 * Achievements will be automatically revealed once the player 
 * completes them, but you can also manually reveal it by using the 
 * appropriate plugin command.
 * 
 * Visible
 * If you set this to false, the achievement will not appear in
 * the achievement list at all. Achievements will be automatically
 * set to be visible once the player completes them, but you can
 * also manually show it by using the appropriate plugin command.
 * 
 * Repeatable
 * This defines how many times the player can repeat this achievement.
 * The default is 1, meaning the player can only complete it once.
 * If you set this to 2, the player can complete it twice, and so on.
 * Setting this to 0 makes the achievement infinitely often repeatable.
 * Default: 1
 * 
 * Max Points
 * The maximum amount of achievement points the achievement can award.
 * This is really only relevant for repeatable achievements, if you want
 * to prevent your players from farming achievement points using simple
 * achievements. The default 0 means there's no special upper limit,
 * just (points for all tiers) * (amount repeatable).
 * Default: 0
 * 
 * Reward
 * The reward for completing the achievement. This is the same as the
 * achievement point reward, aside from the point requirement (see below).
 * You can define any amount of gold, experience, items, weapons and armor.
 * If the player gets a reward by completing an achievement, they will get
 * an additional alert (can be turned off).
 *
 * Reward Mode
 * If you have a repeatable achievement, you may not want the players to get
 * the reward each time they complete the achievement. Using this parameter,
 * you can define if the player should get the reward on each, just the first
 * or just the last completion.
 * Default: 0 (Each Completion)
 *
 * Sort Value
 * This is the sort value by which the achievement's position within its
 * categories is determined. You can just use the default value which
 * orders the achievements by their index, with completed achievements
 * being towards the end of the list. This is an eval, so you can put
 * anything in there that evaluates to a number.
 * Default: this._index + (this.isCompleted() ? 99999 : 0)
 *
 *
 * Categories
 *-----------------------------------------------------------------------------
 *
 * Title
 * This is the category's title, with which it will be displayed in
 * the achievements list. Text codes are allowed here. You can use
 * icons, but by default the categories will have unified icons 
 * depending on if they are expanded or collapsed.
 * 
 * Description
 * The category's description. Use this to describe what kind of
 * achievements are in this category. This does NOT support word
 * wrapping, so you will have to determine yourself how far to 
 * right you can go per line. Text codes are allowed.
 * 
 * Concealed
 * If this is set to true, the category will not be displayed by
 * its regular name, and instead the text specified in the 
 * 'Concealed Category Vocab' parameter will be used. Concealed
 * categories don't have a description and the player can not 
 * expand them.
 *
 * Visible
 * If this is set to true, the whole category will not appear
 * in the achievement list at all. Categories will never be set
 * to be visible automatically, so you have to do that yourself
 * using the appropriate plugin command.
 * 
 *
 * Rewards
 *-----------------------------------------------------------------------------
 * 
 * Points
 * The amount of achievement points required to get this reward.
 *
 * Gold
 * The amount of gold the player will get.
 *
 * Experience
 * The amount of experience each party member will get.
 *
 * Items
 * A list of items the player will get. You can choose any amount per item.
 *
 * Weapons
 * A list of weapons the player will get. You can choose any amount per weapon.
 *
 * Armors
 * A list of armors the player will get. You can choose any amount per armor.
 *
 * Custom
 * A list of custom text lines that will be displayed along with the other
 * rewards. They don't do anything though, you have to add functionality
 * yourself.
 *
 * Eval
 * A custom eval that is executed when the player receives the reward.
 * This is executed even when the parameter 'Use Reward?' is set to false,
 * so you could use it to call a common event using
 * $gameTemp.reserveCommonEvent(x);
 * though you have to keep in mind that there can only be one reserved
 * common event at a time without using plugins. A good plugin that changes
 * that would be 'Common Event Queue' by HimeWorks.
 *
 *
 * General Options
 *-----------------------------------------------------------------------------
 *
 * Achievement Points
 * This determines if the achievement point mechanic will be used.
 * If you turn this off, players will not get any achievement points,
 * nor will they get any achievement point rewards defined in the
 * rewards list. They will still get the rewards from completing 
 * achievements though.
 *
 * Achievement Rewards
 * This determines if players will get rewards for completing achievements
 * or reaching certain amounts of achievement points. They will still get
 * achievement points though.
 *
 * Reward Distribution
 * This option lets you toggle whether achievement rewards and achievement
 * point rewards should actually be distributed upon their completion.
 * If you set this to false, the specified rewards will just be shown
 * in the menu, but not be automatically distributed.
 *
 * Rewards Category Index
 * The index of the rewards category. All possible achievement point rewards
 * will be added to this category for the player to see them.. Set to 0 if
 * you don't want to use this.
 * Default: 2
 *
 * Silent Completion
 * If you turn this on, achievements will not automatically be revealed or
 * set visible when they are completed. The player will also not get any
 * achievement alerts for completing hidden or concealed achievements.
 * Alerts from reaching certain achievement point amounts through hidden
 * or concealed achievements will still be shown though, and they will
 * also get the reward for completing the achievement.
 *
 *
 * Menu Command Options
 *-----------------------------------------------------------------------------
 *
 * Command Name
 * This is the text that will appear in the menu to let the player open the
 * achievement menu.
 *
 * Enabled?
 * If you turn this off, the player will still see the command in the menu,
 * but it will be grayed out and the player will be unable to access the
 * achievement menu this way. Can be turned on and off using a plugin 
 * command.
 *
 * Visible?
 * If you turn this off, the command will not appear in the menu at all.
 * This can also be turned on and off using a plugin command.
 *
 * 
 * Scene Options
 *-----------------------------------------------------------------------------
 *
 * Scene Background
 * This is the picture that will be used as the background image for the
 * achievement menu. You can leave it empty or choose (None) to just use
 * the default blurry background.
 *
 *
 * Title Window Options
 *-----------------------------------------------------------------------------
 *
 * Title Width
 * The width of the title window. This is an eval, so you can put any
 * javascript in there that evaluates to a number.
 * Default: Graphics.boxWidth
 *
 * Title Height
 * The height of the title window. This is an eval, so you can put any
 * javascript in there that evaluates to a number.
 * Default: this.fittingHeight(1)
 *
 * Title X
 * X position of the title window's upper left corner. This is an eval, so you
 * can put any javascript in there that evaluates to a number.
 * Default: 0
 *
 * Title Y
 * Y position of the title window's upper left corner. This is an eval, so you
 * can put any javascript in there that evaluates to a number.
 * Default: 0
 *
 * Title Vocab
 * The text in the title window that serves as the 'headline' of the scene.
 * Text codes are allowed.
 * Default: \c[23]Achievements
 *
 * Title Align
 * Alignment of the title text. You can choose between left, center and 
 * right. If you choose right and have achiement points enabled, the text 
 * will overlap with the total point reward, so you should turn them off
 * in this case.
 * Default: Center
 *
 * Total Points Vocab
 * If you're using the points mechanic, this is how total amount of achievement
 * points the player has accumulated will be displayed on the righthand side
 * of the title window. Text codes are allowed.
 * Default: %1\i[163]
 *
 *
 * List Window Options
 *-----------------------------------------------------------------------------
 *
 * List Width
 * The width of the list window. This is an eval, so you can put any
 * javascript in there that evaluates to a number.
 * Default: Graphics.boxWidth / 3 + 16
 *
 * List Height
 * The height of the list window. This is an eval, so you can put any
 * javascript in there that evaluates to a number.
 * Default: Graphics.boxHeight - this.fittingHeight(1)
 *
 * List X
 * X position of the list window's upper left corner. This is an eval, so you
 * can put any javascript in there that evaluates to a number.
 * Default: 0
 *
 * List Y
 * Y position of the list window's upper left corner. This is an eval, so you
 * can put any javascript in there that evaluates to a number.
 * Default: this.fittingHeight(1)
 *
 * Use Category Icons?
 * If this is on, each category will have an icon displayed before its title
 * indicating if it is expanded or collapsed. If you want to use custom icons
 * for the categories you can turn this off, but they will then be static and
 * not change depending on the category's state.
 * Default: true
 *
 * Collapsed Prefix
 * This is an extra bit of text that is prepended to collapsed categories.
 * You can use this to show an arrow icon, a + sign or whatever else you can
 * think of.
 * Default: \i[187]
 *
 * Expanded Prefix
 * This is an extra bit of text that is prepended to expanded categories.
 * You can use this to show an arrow icon, a - sign or whatever else you can
 * think of.
 * Default: \i[189]
 *
 * Concealed Achievement Vocab
 * This is the text that is displayed instead of an achievement's actual title
 * when it is concealed.
 * Default: \i[161]???
 *
 * Concealed Category Vocab
 * This is the text that is displayed instead of a category's actual title
 * when it is concealed.
 * Default: ???
 *
 * Achievement Indent
 * Achievements will be indented by this many pixels to the right in the 
 * achievement list.
 * Default: 8
 *
 * Point Rewards Format
 * If you're using the Rewards Category, this is the title by which the
 * rewards will be displayed in the list. Text codes allowed.
 * Default: \i[163]%1
 *
 * Point Rewards Completed Format
 * Title of rewards once they are completed.
 * Default: \i[163]\c[21]%1
 *
 *
 * Data Window Options
 *-----------------------------------------------------------------------------
 *
 * Data Width
 * The width of the data window. This is an eval, so you can put any
 * javascript in there that evaluates to a number.
 * Default: Graphics.boxWidth * 2 / 3 - 16
 *
 * Data Height
 * The height of the data window. This is an eval, so you can put any
 * javascript in there that evaluates to a number.
 * Default: Graphics.boxHeight - this.fittingHeight(1)
 *
 * Data X
 * X position of the data window's upper left corner. This is an eval, so you
 * can put any javascript in there that evaluates to a number.
 * Default: Graphics.boxWidth / 3 + 16
 *
 * Data Y
 * Y position of the data window's upper left corner. This is an eval, so you
 * can put any javascript in there that evaluates to a number.
 * Default: this.fittingHeight(1)
 *
 * Progress Display Mode
 * Current Total: The Progress bar displays the progress with the current 
 *   value being the total achievement progress and the maximum being the 
 *   current tier goal.
 * Current Tier: The Progress bar displays the progress with the current 
 *   value being the current tier progress and the maximum being the 
 *   current tier goal.
 * Total: The Progress bar displays the progress with the current 
 *   value being the total achievement progress and the maximum being the 
 *   last achievement goal.
 * Default: 0 (Current Total)
 *
 * Progress Vocab
 * Text that is displayed on the lefthand side above the progress bar to
 * indicate the player's progress per tier. Text codes allowed.
 * Default: Progress: %1/%2 (%3%)
 *
 * Tier Vocab
 * Text that is displayed on the righthand side above the progress bar to
 * show the player their current tier. Text codes allowed.
 * Default: Tier: %1/%2
 *
 * Point Vocab Next
 * The text that shows the amount of achievement points the player gets
 * for completing the current tier. Text codes allowed.
 * Default: Next Tier: %1\i[163]
 *
 * Point Vocab Total
 * The text that shows the total amount of achievement points this achievemnt
 * has awarded the player so far, out of the total amount it can award.
 * Text codes allowed.
 * Default: %1/%2\i[163]
 *
 * Point Vocab Infinite
 * The text that is displayed in case the achievement can award an unlimited
 * amount of achievement points. Text codes allowed.
 * Default: %1\i[163]
 *
 * Reward Vocab
 * The text that is displayed at the top of the Rewards section.
 * Text codes allowed.
 * Default: \c[1]Reward
 *
 * Reward Format Gold
 * The format that is used for gold rewards. Text codes allowed.
 * Default: \i[313]\g: x%1
 * 
 * Reward Format Experience
 * The format that is used for experience rewards. Text codes allowed.
 * Default: \i[79]Experience: x%1
 * 
 * Reward Format Items
 * The format that is used for item, weapon and armor rewards.
 * Text codes allowed.
 * Default: \i[%1]%2: x%3
 *
 * Repeatable Vocab
 * The text that shows the total amount the player has repeated the
 * achievement, out of the total possible.
 * Default: Repeated: %1/%2
 *
 * Repeatable Vocab Infinite
 * The text that is displayed in case the achievement can be repeated
 * infinitely often.
 * Default: Repeated: %1
 *
 * Horizontal Line Color 1
 * The 'left' color of the line's gradient. The colors defined here
 * also affect the line in the alert window.
 * Default: 1
 *
 * Horizontal Line Color 2
 * The 'right' color of the line's gradient. The colors defined here
 * also affect the line in the alert window.
 * Default: 9
 *
 *
 * Alert Window Options
 *-----------------------------------------------------------------------------
 *
 * Show Alert Window?
 * Toggle if you want to use the alert window at all. All alerts will be 
 * turned off if you turn this off.
 * Default: true
 *
 * Show New Tier Alert?
 * This allows you to toggle alerts for reaching new achievement tiers.
 * Alerts for achievement completion and rewards will still be shown if
 * you turn this off.
 * Default: true
 *
 * Show Reward Alert?
 * This allows you to toggle alerts for achievement point rewards. Alerts
 * for achievement completions or new tiers will still be shown if you turn
 * this off.
 * Default: true
 * 
 * Alert Width
 * The width of the alert window. This is an eval, so you can put any
 * javascript in there that evaluates to a number.
 * Default: Graphics.boxWidth / 2
 *
 * Alert X
 * X position of the alert window's upper left corner. This is an eval, so you
 * can put any javascript in there that evaluates to a number.
 * Default: Graphics.boxWidth / 4
 *
 * Alert Y
 * Y position of the alert window's upper left corner. This is an eval, so you
 * can put any javascript in there that evaluates to a number.
 * Default: 0
 *
 * Alert Window Skin
 * The window skin used for the alert window.
 * Default: Window
 *
 * Alert Vocab Completion
 * The text that is displayed when the player completes any achievement.
 * Default: Achievement Completed!
 *
 * Alert Vocab Progress
 * The text that is displayed when the player reaches a new tier in any
 * achievement.
 * Default: Achievement Progressed!
 *
 * Alert Vocab Achievement Reward
 * Additional text that is displayed below the completion/progress vocab
 * when the player completes an achievement that yields a reward.
 * Default: Got reward!
 *
 * Alert Vocab Point Reward
 * The text that is displayed when the player gets any achievement point
 * reward.
 * Default: Got reward!
 *
 * Time Visible
 * The amount of frames the alert window stays opened.
 * Default: 120
 *
 * Alert Sound Name
 * The name of the SE file. Choose (None) of you don't want a sound
 * to be played.
 * Default: Absorb2
 *
 * Alert Sound Volume
 * Volume of the sound effect.
 * Default: 90
 *
 * Alert Sound Pitch
 * Pitch of the sound effect.
 * Default: 100
 *
 * Alert Sound Pan
 * Pan of the sound effect.
 * Default: 0
 *
 * 
 *=============================================================================
 * Compatibility
 *=============================================================================
 * 
 * YEP_MainMenuManager integration
 *-----------------------------------------------------------------------------
 *
 * Name:        Horsti.AS.commandName
 * Symbol:      achievements
 * Show:        $gameSystem.achievementsVisible()
 * Enabled:     $gameSystem.achievementsEnabled()
 * Ext:         
 * Main Bind:   this.commandAchievements.bind(this)
 * Actor Bind:  
 *
 *
 *=============================================================================
 * Changelog
 *=============================================================================
 *
 * v1.2: No bug fixes, just small code improvements.
 * v1.1: Changed category icons to be text, fixed some plugin command bugs. 
 * v1.0: Finished Plugin.
 * 
 *=============================================================================
 */
/*~struct~Achievement:
 *
 * @param Title
 * @desc Title of this achievement.
 * Text codes allowed.
 * @default \i[87]Untitled Achievement
 *
 * @param Completed Title
 * @desc Title of this achievement when it is completed. Text codes allowed. %1: Title
 * @default \c[21]%1
 *
 * @param Description
 * @type note
 * @desc The description used for this achievement. %1: Current tier goal, %2: Max tier goal.
 * @default "This is the \\c[4]default\\c[0] achievement\ndescription."
 *
 * @param Tiers
 * @type struct<AchievementTier>[]
 * @desc Tiers for this achievement.
 * @default ["{\"Progress\":\"1\",\"Points\":\"0\",\"Eval\":\"\\\"\\\"\"}"]
 *
 * @param Categories
 * @type text[]
 * @desc The categories this achievement will be placed in.
 * Has to match one of the defined categories.
 * @default ["All"]
 *
 * @param Concealed
 * @type boolean
 * @on Conceal
 * @off Don't conceal
 * @desc Will this achievement appear concealed?
 * @default false
 *
 * @param Visible
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Will this achievement be visible from the beginning?
 * @default true
 *
 * @param Repeatable
 * @type number
 * @desc Amount of times this achievement is completable. 0 for infinite (max int) repetitions.
 * @default 1
 *
 * @param Max Points
 * @type number
 * @desc Maximum amount of achievement points this achievement can 
 * reward. Useful to limit points for repeatable achievements.
 * @default 0
 *
 * @param Reward
 * @type struct<AchievementReward>
 * @desc Reward the player will get upon completion.
 * @default {"Gold":"0","Experience":"0","Items":"[]","Weapons":"[]","Armors":"[]","Custom":"[]","Eval":""}
 *
 * @param Reward Mode
 * @type select
 * @option Each Completion
 * @value 0
 * @option First Completion
 * @value 1
 * @option Last Completion
 * @value 2
 * @desc For repeatable achievements, when will the player get the reward?
 * @default 0
 *
 * @param Sort Value
 * @desc Sort value of this achievement. This is an eval. Higher means further down in the list.
 * @default this._index + (this.isCompleted() ? 99999 : 0)
 *
 */
/*~struct~AchievementCategory:
 *
 * @param Title
 * @desc Title of this category.
 * Text codes allowed.
 * @default Miscellaneous
 *
 * @param Description
 * @type note
 * @desc The description of this category.
 * Text codes allowed.
 * @default "This is the \\c[4]default\\c[0] category\ndescription."
 *
 * @param Concealed
 * @type boolean
 * @on Conceal
 * @off Reveal
 * @desc Will this category by concealed by default?
 * @default false
 *
 * @param Visible
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Will this category be visible from the beginning?
 * @default true
 *
 */
/*~struct~AchievementTier:
 *
 * @param Progress
 * @type number
 * @min 1
 * @desc Total achievement progress required to complete this tier.
 * @default 1
 *
 * @param Points
 * @type number
 * @desc Achievement points rewarded for this tier.
 * @default 0
 *
 * @param Eval
 * @type note
 * @desc Custom eval that is executed upon completion of this tier.
 * @default ""
 *
 */
/*~struct~AchievementReward:
 *
 * @param Gold
 * @type number
 * @desc Amount of gold rewarded.
 * @default 0
 *
 * @param Experience
 * @type number
 * @desc Amount of experience rewarded per party member.
 * @default 0
 *
 * @param Items
 * @type struct<ItemReward>[]
 * @desc Items rewarded.
 * @default []
 *
 * @param Weapons
 * @type struct<WeaponReward>[]
 * @desc Weapons rewarded.
 * @default []
 *
 * @param Armors
 * @type struct<ArmorReward>[]
 * @desc Armors rewarded.
 * @default []
 *
 * @param Custom
 * @type text[]
 * @desc Custom text that is displayed as a reward. Text codes allowed.
 * @default []
 *
 * @param Eval
 * @type note
 * @desc Custom eval that is executed upon receiving the reward.
 * @default ""
 *
 */
/*~struct~AchievementPointReward:
 *
 * @param Points
 * @type number
 * @min 1
 * @desc Amount of achievement points required for this reward.
 * @default 1 
 *
 * @param Gold
 * @type number
 * @desc Amount of gold rewarded.
 * @default 0
 *
 * @param Experience
 * @type number
 * @desc Amount of experience rewarded per party member.
 * @default 0
 *
 * @param Items
 * @type struct<ItemReward>[]
 * @desc Items rewarded.
 * @default []
 *
 * @param Weapons
 * @type struct<WeaponReward>[]
 * @desc Weapons rewarded.
 * @default []
 *
 * @param Armors
 * @type struct<ArmorReward>[]
 * @desc Armors rewarded.
 * @default []
 *
 * @param Custom
 * @type text[]
 * @desc Custom text that is displayed as a reward. Text codes allowed.
 * @default []
 *
 * @param Eval
 * @type note
 * @desc Custom eval that is executed upon receiving the reward.
 * @default ""
 *
 */
/*~struct~ItemReward:
 *
 * @param Item
 * @type item
 * @desc Index of the item.
 * @default 1
 *
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @desc Amount the party will be rewarded.
 * @default 1
 *
 */
/*~struct~WeaponReward:
 *
 * @param Weapon
 * @type weapon
 * @desc Index of the weapon.
 * @default 1
 *
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @desc Amount the party will be rewarded.
 * @default 1
 *
 */
/*~struct~ArmorReward:
 *
 * @param Armor
 * @type armor
 * @desc Index of the armor.
 * @default 1
 *
 * @param Amount
 * @type number
 * @min 1
 * @max 99
 * @desc Amount the party will be rewarded.
 * @default 1
 *
 */

//=============================================================================

//=============================================================================
// Parameters
//=============================================================================

Horsti.AS.Parameters = PluginManager.parameters("HO_AchievementSystem");

Horsti.AS.usePoints = (Horsti.AS.Parameters["Achievement Points"] === "true");
Horsti.AS.useRewards = (Horsti.AS.Parameters["Achievement Rewards"] === "true");
Horsti.AS.distributeRewards = (Horsti.AS.Parameters["Reward Distribution"] === "true");
Horsti.AS.rewardsCategory = Number(Horsti.AS.Parameters["Rewards Category Index"]);
Horsti.AS.silentCompletion = (Horsti.AS.Parameters["Silent Completion"] === "true");

Horsti.AS.commandName = String(Horsti.AS.Parameters["Command Name"]);
Horsti.AS.commandEnabled = (Horsti.AS.Parameters["Enabled?"] === "true");
Horsti.AS.commandVisible = (Horsti.AS.Parameters["Visible?"] === "true");

Horsti.AS.sceneBackground = String(Horsti.AS.Parameters["Scene Background"]);

Horsti.AS.titleWidth = Horsti.AS.Parameters["Title Width"];
Horsti.AS.titleHeight = Horsti.AS.Parameters["Title Height"];
Horsti.AS.titleX = Horsti.AS.Parameters["Title X"];
Horsti.AS.titleY = Horsti.AS.Parameters["Title Y"];
Horsti.AS.titleVocab = String(Horsti.AS.Parameters["Title Vocab"]);
Horsti.AS.titleAlign = String(Horsti.AS.Parameters["Title Align"]);
Horsti.AS.totalPointsVocab = String(Horsti.AS.Parameters["Total Points Vocab"]);

Horsti.AS.listWidth = Horsti.AS.Parameters["List Width"];
Horsti.AS.listHeight = Horsti.AS.Parameters["List Height"];
Horsti.AS.listX = Horsti.AS.Parameters["List X"];
Horsti.AS.listY = Horsti.AS.Parameters["List Y"];
//Horsti.AS.useCategoryIcons = (Horsti.AS.Parameters["Use Category Icons?"] === "true");
Horsti.AS.concealedAchievement = Horsti.AS.Parameters["Concealed Achievement Vocab"];
Horsti.AS.concealedCategory = Horsti.AS.Parameters["Concealed Category Vocab"];
Horsti.AS.prefixCollapsed = String(Horsti.AS.Parameters["Collapsed Prefix"]);
Horsti.AS.prefixExpanded = String(Horsti.AS.Parameters["Expanded Prefix"]);
Horsti.AS.achievementIndent = Number(Horsti.AS.Parameters["Achievement Indent"]);
Horsti.AS.pointRewardsFormat = String(Horsti.AS.Parameters["Point Rewards Format"]);
Horsti.AS.pointRewardsCompletedFormat = String(Horsti.AS.Parameters["Point Rewards Completed Format"]);

Horsti.AS.dataWidth = Horsti.AS.Parameters["Data Width"];
Horsti.AS.dataHeight = Horsti.AS.Parameters["Data Height"];
Horsti.AS.dataX = Horsti.AS.Parameters["Data X"];
Horsti.AS.dataY = Horsti.AS.Parameters["Data Y"];
Horsti.AS.progressMode = Number(Horsti.AS.Parameters["Progress Display Mode"]);
Horsti.AS.progressVocab = String(Horsti.AS.Parameters["Progress Vocab"]);
Horsti.AS.tierVocab = String(Horsti.AS.Parameters["Tier Vocab"]);
Horsti.AS.pointVocabNext = String(Horsti.AS.Parameters["Point Vocab Next"]);
Horsti.AS.pointVocabTotal = String(Horsti.AS.Parameters["Point Vocab Total"]);
Horsti.AS.pointVocabInfinite = String(Horsti.AS.Parameters["Point Vocab Infinite"]);
Horsti.AS.rewardVocab = String(Horsti.AS.Parameters["Reward Vocab"]);
Horsti.AS.rewardFormatGold = String(Horsti.AS.Parameters["Reward Format Gold"]);
Horsti.AS.rewardFormatExp = String(Horsti.AS.Parameters["Reward Format Experience"]);
Horsti.AS.rewardFormatItems = String(Horsti.AS.Parameters["Reward Format Items"]);
Horsti.AS.rewardFormatPoints = String(Horsti.AS.Parameters["Reward Format Points"]);
Horsti.AS.repeatableVocab = String(Horsti.AS.Parameters["Repeatable Vocab"]);
Horsti.AS.repeatableVocabInfinite = String(Horsti.AS.Parameters["Repeatable Vocab Infinite"]);
Horsti.AS.horzLineColor1 = Number(Horsti.AS.Parameters["Horizontal Line Color 1"]);
Horsti.AS.horzLineColor2 = Number(Horsti.AS.Parameters["Horizontal Line Color 2"]);

Horsti.AS.showAlert = (Horsti.AS.Parameters["Show Alert Window?"] === "true");
Horsti.AS.showAlertProgress = (Horsti.AS.Parameters["Show New Tier Alert?"] === "true");
Horsti.AS.showAlertReward = (Horsti.AS.Parameters["Show Reward Alert?"] === "true");
Horsti.AS.alertWidth = Horsti.AS.Parameters["Alert Width"];
Horsti.AS.alertX = Horsti.AS.Parameters["Alert X"];
Horsti.AS.alertY = Horsti.AS.Parameters["Alert Y"];
Horsti.AS.alertWindowSkin = Horsti.AS.Parameters["Alert Window Skin"];
Horsti.AS.alertVocabCompletion = String(Horsti.AS.Parameters["Alert Vocab Completion"]);
Horsti.AS.alertVocabProgress = String(Horsti.AS.Parameters["Alert Vocab Progress"]);
Horsti.AS.alertVocabAchievementReward = String(Horsti.AS.Parameters["Alert Vocab Achievement Reward"]);
Horsti.AS.alertVocabPointReward = String(Horsti.AS.Parameters["Alert Vocab Point Reward"]);
Horsti.AS.alertTime = Number(Horsti.AS.Parameters["Time Visible"]);
Horsti.AS.alertSeName = String(Horsti.AS.Parameters["Alert Sound Name"]);
Horsti.AS.alertSeVolume = Number(Horsti.AS.Parameters["Alert Sound Volume"]).clamp(0, 100);
Horsti.AS.alertSePitch = Number(Horsti.AS.Parameters["Alert Sound Pitch"]).clamp(50, 200);
Horsti.AS.alertSePan = Number(Horsti.AS.Parameters["Alert Sound Pan"]).clamp(-100, 100);

Horsti.AS.isReward = function(reward) {
	if (!reward) return false;
	var itemAmount = 0;
	itemAmount += reward.items ? reward.items.length : 0;
	itemAmount += reward.weapons ? reward.weapons.length : 0;
	itemAmount += reward.armors ? reward.armors.length : 0;
	return reward.gold > 0 || reward.exp > 0 || itemAmount > 0;
};

Horsti.AS.distributeReward = function(reward) {
	var distributeItem = function(key, list, data) {
		for (var i = 0; i < list.length; ++i) {
			var item = list[i];
			var index = Number(item[key]);
			var amount = Number(item['Amount']);
			if (amount > 0) $gameParty.gainItem(data[index], amount);
		}
	}
	if (!Horsti.AS.distributeRewards) return false;
	if (!Horsti.AS.isReward(reward)) return false;
	$gameParty.gainGold(Number(reward.gold));
	$gameParty.members().forEach(function(member) { member.gainExp(reward.exp); });
	distributeItem('Item', reward.items, $dataItems);
	distributeItem('Weapon', reward.weapons, $dataWeapons);
	distributeItem('Armor', reward.armors, $dataArmors);
	return true;
};

Horsti.AS.evalRewardCode = function(reward) {
	if (!reward) return;
	var code = reward.eval;
	if (!code) return;
	Horsti.Utils.evalCode(code, 'Failed to execute custom reward eval.');
};

Horsti.AS.defaultAchievement = {
	title:           '\\i\[87\]Untitled Achievement',
	completedTitle:  '\\c\[21\]\\i\[87\]Untitled Achievement',
	description:     '',
	tiers:           [{'Progress': 1, 'Points': 0}],
	concealed:       false,
	visible:         true,
	categories:      [],
	repeatable:      1,
	maxPoints:       0,
	reward:          undefined,
	rewardMode:      0,
	sortValue:       '1 + (this.isCompleted() ? 99999 : 0)'
}

Horsti.AS.defaultCategory = {
	title:           '\\i\[87\]Untitled Category',
	description:     '',
	concealed:       false,
	visible:         true,
}

//=============================================================================
// DataManager
//=============================================================================

var $dataAchievements = [undefined];
var $dataAchievementCategories = [undefined];
var $dataAchievementRewards = [undefined];

Horsti.AS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!Horsti.AS.DataManager_isDatabaseLoaded.call(this)) return false;
	this.loadAchievements();
	this.loadAchievementCategories();
	this.loadAchievementRewards();
	return true;
};

DataManager.loadAchievements = function() {
	var getKey = function(data, key, parse, isNumber) {
		if (!data[key]) return Horsti.AS.defaultAchievement[key];
		var value = null;
		if (parse) value = Horsti.Utils.parseJson(data[key]);
		else value = String(data[key]);
		if (!value) return Horsti.AS.defaultAchievement[key];
		if (isNumber) return Number(value);
		return value;
	};
	var parseReward = function(rewardString) {
		if (!rewardString) return Horsti.AS.defaultAchievement['reward'];
		var data = Horsti.Utils.parseJson(rewardString);
		if (!data) return Horsti.AS.defaultAchievement['reward'];
		var reward = {
			gold:     Number(data['Gold']),
			exp:      Number(data['Experience']),
			items:    Horsti.Utils.parseJson(data['Items']).map(function(item) { return Horsti.Utils.parseJson(item); }),
			weapons:  Horsti.Utils.parseJson(data['Weapons']).map(function(item) { return Horsti.Utils.parseJson(item); }),
			armors:   Horsti.Utils.parseJson(data['Armors']).map(function(item) { return Horsti.Utils.parseJson(item); }),
			custom:   Horsti.Utils.parseJson(data['Custom']),
			eval:     data['Eval'] ? Horsti.Utils.parseJson(data['Eval']) : ''
		}
		return reward;
	};
	var parseTiers = function(tiersString) {
		if (!tiersString) return Horsti.AS.defaultAchievement['tiers'];
		var tiers = Horsti.Utils.parseJson(tiersString);
		if (!tiers) return Horsti.AS.defaultAchievement['tiers'];
		tiers = tiers.map(function(tier) { return Horsti.Utils.parseJson(tier); });
		tiers.forEach(function(tier) { tier['Eval'] = Horsti.Utils.parseJson(tier['Eval']); });
		return tiers;
	};
	$dataAchievements = [undefined];
	var achievements = Horsti.Utils.parseJson(Horsti.AS.Parameters['Achievement List']);
	for (var i = 0; i < achievements.length; ++i) {
		var data = Horsti.Utils.parseJson(achievements[i]);
		if (data) {
			var achievement = {
				title:           getKey(data, 'Title'),
				completedTitle:  getKey(data, 'Completed Title'),
				description:     getKey(data, 'Description', true),
				tiers:           parseTiers(data['Tiers']),
				concealed:       (data['Concealed'] === 'true'),
				visible:         (data['Visible'] === 'true'),
				categories:      getKey(data, 'Categories', true),
				repeatable:      getKey(data, 'Repeatable', false, true),
				maxPoints:       getKey(data, 'Max Points', false, true),
				reward:          parseReward(data['Reward']),
				rewardMode:      getKey(data, 'Reward Mode', false, true),
				sortValue:       getKey(data, 'Sort Value'),
			}
			$dataAchievements.push(achievement);
		} 
		else $dataAchievements.push(undefined);
	}
};

DataManager.loadAchievementCategories = function() {
	var getKey = function(data, key, parse, isNumber) {
		if (!data[key]) return Horsti.AS.defaultCategory[key];
		var value = null;
		if (parse) value = Horsti.Utils.parseJson(data[key]);
		else value = String(data[key]);
		if (!value) return Horsti.AS.defaultCategory[key];
		if (isNumber) return Number(value);
		return value;
	};
	$dataAchievementCategories = [undefined];
	var categories = Horsti.Utils.parseJson(Horsti.AS.Parameters['Category List']);
	for (var i = 0; i < categories.length; ++i) {
		var data = Horsti.Utils.parseJson(categories[i]);
		if (data) {
			var category = {
				title:        getKey(data, 'Title'),
				description:  getKey(data, 'Description', true),
				concealed:    (data['Concealed'] === 'true'),
				visible:      (data['Visible'] === 'true')
			}
			$dataAchievementCategories.push(category);
		} 
		else $dataAchievementCategories.push(undefined);
	}
};

DataManager.loadAchievementRewards = function() {
	$dataAchievementRewards = [undefined];
	if (!Horsti.AS.Parameters['Reward List']) return;
	var rewards = Horsti.Utils.parseJson(Horsti.AS.Parameters['Reward List']);
	if (!rewards) return;
	for (var i = 0; i < rewards.length; ++i) {
		var data = Horsti.Utils.parseJson(rewards[i]);
		var reward = { points: 0, gold: 0, experience: 0, items: [], weapons: [], armors: [], custom: [] };
		var reward = {
			points:   Number(data['Points']),
			gold:     Number(data['Gold']),
			exp:      Number(data['Experience']),
			items:    Horsti.Utils.parseJson(data['Items']).map(function(item) { return Horsti.Utils.parseJson(item); }),
			weapons:  Horsti.Utils.parseJson(data['Weapons']).map(function(item) { return Horsti.Utils.parseJson(item); }),
			armors:   Horsti.Utils.parseJson(data['Armors']).map(function(item) { return Horsti.Utils.parseJson(item); }),
			custom:   Horsti.Utils.parseJson(data['Custom']),
			eval:     data['Eval'] ? Horsti.Utils.parseJson(data['Eval']) : ''
		}
		$dataAchievementRewards.push(reward);
	}
};

Horsti.AS.DataManager_loadGame = DataManager.loadGame;
DataManager.loadGame = function(savefileId) {
	if (!Horsti.AS.DataManager_loadGame.call(this, savefileId)) return false;
	this.updateAchievements();
	return true;
};

DataManager.updateAchievements = function() {
	if (!$gameParty) return;
	if (!$gameParty.achievements()) {
		$gameParty.initializeAchievementData();
	}
	else {
		$gameParty.achievements().removeDeletedAchievements();
		$gameParty.achievements().resetCategoryAchievements();
	}
};

//=============================================================================
// Game_System
//=============================================================================

Horsti.AS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Horsti.AS.Game_System_initialize.call(this);
	this._achievementsVisible = Horsti.AS.commandVisible;
	this._achievementsEnabled = Horsti.AS.commandEnabled;
	this._achievementAlertsEnabled = Horsti.AS.showAlert;
	this._achievementProgressAlertsEnabled = Horsti.AS.showAlertProgress;
	this._achievementPointRewardAlertsEnabled = Horsti.AS.showAlertReward;
	this._progressMode = Horsti.AS.progressMode;
	this._silentAchievementCompletion = Horsti.AS.silentCompletion;
};

Game_System.prototype.achievementsVisible = function() {
	if (this._achievementsVisible === undefined) this._achievementsVisible = Horsti.AS.commandVisible;
	return this._achievementsVisible;
};

Game_System.prototype.setAchievementVisibility = function(value) {
	this._achievementsVisible = value;
};

Game_System.prototype.achievementsEnabled = function() {
	if (this._achievementsEnabled === undefined) this._achievementsEnabled = Horsti.AS.commandEnabled;
	return this._achievementsEnabled;
};

Game_System.prototype.setAchievementAvailability = function(value) {
	this._achievementsEnabled = value;
};

Game_System.prototype.achievementAlertsEnabled = function() {
	if (this._achievementAlertsEnabled === undefined) this._achievementAlertsEnabled = Horsti.AS.showAlert;
	return this._achievementAlertsEnabled;
};

Game_System.prototype.setAchievementAlertAvailability = function(value) {
	this._achievementAlertsEnabled = value;
};

Game_System.prototype.achievementProgressAlertsEnabled = function() {
	if (this._achievementProgressAlertsEnabled === undefined) this._achievementProgressAlertsEnabled = Horsti.AS.showAlertProgress;
	return this._achievementProgressAlertsEnabled;
};

Game_System.prototype.setAchievementProgressAlertAvailability = function(value) {
	this._achievementProgressAlertsEnabled = value;
};

Game_System.prototype.achievementPointRewardAlertsEnabled = function() {
	if (this._achievementPointRewardAlertsEnabled === undefined) this._achievementProgressAlertsEnabled = Horsti.AS.showAlertReward;
	return this._achievementPointRewardAlertsEnabled;
};

Game_System.prototype.setAchievementPointRewardAlertAvailability = function(value) {
	this._achievementPointRewardAlertsEnabled = value;
};

Game_System.prototype.getProgressMode = function() {
	if (this._progressMode === undefined) this._progressMode = Horsti.AS.progressMode;
	return this._progressMode;
};

Game_System.prototype.setProgressMode = function(value) {
	this._progressMode = value;
};

Game_System.prototype.silentAchievementCompletionEnabled = function() {
	if (this._silentAchievementCompletion === undefined) this._silentAchievementCompletion = Horsti.AS.silentCompletion;
	return this._silentAchievementCompletion;
};

Game_System.prototype.setSilentAchievementCompletion = function(value) {
	this._silentAchievementCompletion = value;
};

//=============================================================================
// Game_Party
//=============================================================================

Horsti.AS._Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
	Horsti.AS._Game_Party_initialize.call(this);
	this.initializeAchievementData();
};

Game_Party.prototype.initializeAchievementData = function() {
	this._achievements = new Game_Achievements();
};

Game_Party.prototype.getAchievementAmount = function() {
	return this.achievements().data().length;
};

Game_Party.prototype.achievements = function() {
	if (!this._achievements) this.initializeAchievementData();
	return this._achievements;
};

Game_Party.prototype.achievement = function(index) {
	return this.achievements().achievement(index);
};

Game_Party.prototype.achievementCategory = function(index) {
	return this.achievements().category(index);
};

Game_Party.prototype.pushAchievementAlert = function(index, mode, reward) {
	// mode can be 'completion', 'progress' or 'reward'
	if (!$gameSystem.achievementAlertsEnabled()) return;
	if (mode === 'reward' && !$gameSystem.achievementPointRewardAlertsEnabled()) return;
	if (mode !== 'reward' && (!this.achievement(index).isVisible() || this.achievement(index).isConcealed())) return;
	if (mode === 'progress' && !$gameSystem.achievementProgressAlertsEnabled()) return;
	this.achievements().alerts().push({
		index:  index,
		mode:   mode,
		reward: reward
	});
};

Game_Party.prototype.hasPendingAlerts = function() {
	return this.achievements().alerts().length > 0;
};

Game_Party.prototype.getNextAlert = function() {
	if (this.achievements().alerts().length > 0) return this.achievements().alerts().shift();
	return undefined;
};

Game_Party.prototype.peekNextAlert = function() {
	if (this.achievements().alerts().length > 0) return this.achievements().alerts()[0];
	return undefined;
};

//=============================================================================
// Game_Achievements
//=============================================================================

function Game_Achievements() {
	this.initialize.apply(this, arguments);	
}

Game_Achievements.prototype.initialize = function() {
	this.initData();
	this.reset();
};

Game_Achievements.prototype.initData = function() {
	this._data = [];
	this._categories = [];
	this._categoryMap = {};
	this._enabled = Horsti.AS.commandEnabled;
	this._visible = Horsti.AS.commandVisible;
	this._alerts = [];
	this._points = 0;
	this._rewards = [];
};

Game_Achievements.prototype.reset = function() {
	this.resetAchievements();
	this.resetCategories();
	this.resetCategoryAchievements();
	this.resetRewardsCategory();
};

Game_Achievements.prototype.resetAchievements = function() {
	this._data = [];
	for (var i = 0; i < $dataAchievements.length; ++i) {
		if ($dataAchievements[i]) this._data.push(new Game_Achievement(i));
		else this._data.push(undefined);
	}
};

Game_Achievements.prototype.resetCategories = function() {
	this._categories = [];
	this._categoryMap = {};
	for (var i = 0; i < $dataAchievementCategories.length; ++i) {
		if ($dataAchievementCategories[i]) {
			var category = new Game_AchievementCategory(i);
			this._categories.push(category);
			this._categoryMap[category.getTitle()] = category;
		}
		else this._categories.push(undefined);
	}
};

Game_Achievements.prototype.resetCategoryAchievements = function() {
	for (var i = 0; i < $dataAchievementCategories.length; ++i) {
		var category = this.category(i);
		if (!category || i === Horsti.AS.rewardsCategory) continue;
		category.setAchievements([]);
	}
	for (var i = 0; i < this.data().length; ++i) {
		var achievement = this.achievement(i);
		if (!achievement) continue;
		for (var j = 0; j < achievement.getCategories().length; ++j) {
			var category = achievement.getCategories()[j];
			if (!category) continue;
			try {
				if (!!Number(category)) this._categories[Number(category)].addAchievement(achievement);
				else this._categoryMap[category].addAchievement(achievement);
			}
			catch (e) {
				console.error("Failed to add achievement " + i + " to its category " + category);
			}
		}
	}
};

Game_Achievements.prototype.resetRewardsCategory = function() {
	if (Horsti.AS.rewardsCategory === 0 || !Horsti.AS.usePoints || !Horsti.AS.useRewards) return;
	if ($dataAchievementRewards.length <= 1) {
		this._rewards = [];
		return;
	}
	var category = this.category(Horsti.AS.rewardsCategory);
	if (!category) {
		console.error('Rewards category with index %1 does not exist.'.format(Horsti.AS.rewardsCategory));
		return;
	}
	category.setAchievements([]);
	for (var i = 0; i < $dataAchievementRewards.length; ++i) {
		if ($dataAchievementRewards[i]) {
			var reward = new Game_AchievementPointReward(i);
			this._rewards.push(reward);
			category.addAchievement(reward);
		}
		else this._rewards.push(undefined);
	}
};

Game_Achievements.prototype.resetAchievement = function(index) {
	if (index <= 0 || index >= $dataAchievements.length) return;
	this._data[index] = new Game_Achievement(index);
};

Game_Achievements.prototype.resetAchievementCategory = function(index) {
	if (index <= 0 || index >= $dataAchievementCategories.length) return;
	var category = new Game_AchievementCategory(index);
	this._categories[index] = category;
	this._categoryMap[category.getTitle()] = category;
};

Game_Achievements.prototype.resetAchievementPointReward = function(index) {
	if (index <= 0 || index >= this._rewards.length) return;
	this._rewards[index] = new Game_AchievementPointReward(index);
};

Game_Achievements.prototype.removeDeletedAchievements = function() {
	this._data = this._data.slice(0, $dataAchievements.length);
};

Game_Achievements.prototype.data = function() {
	return this._data;
};

Game_Achievements.prototype.categories = function() {
	return this._categories;
};

Game_Achievements.prototype.alerts = function() {
	return this._alerts;
};

Game_Achievements.prototype.achievement = function(index) {
	if (!this._data[index]) this.resetAchievement(index);
	return this._data[index];
};

Game_Achievements.prototype.category = function(index) {
	if (!this._categories[index]) this.resetAchievementCategory(index);
	return this._categories[index];
};

Game_Achievements.prototype.reward = function(index) {
	if (!this._rewards[index]) this.resetAchievementPointReward(index);
	return this._rewards[index];
};

Game_Achievements.prototype.isRewardsCategory = function(category) {
	if (!Number(category) && typeof category === 'string') {
		categoryIndex = $gameParty.achievements().categoryByTitle(category)._index;
		return categoryIndex === Horsti.AS.rewardsCategory;
	}
	else if (Number(category) || typeof category === 'number') {
		return category === Horsti.AS.rewardsCategory;
	}
	return false;
};

Game_Achievements.prototype.categoryByTitle = function(title) {
	if (!this._categoryMap[title]) {
		var index = $dataAchievementCategories.map(function(category) {
			if (category) return category.title;
			else return undefined;
		}).indexOf(title);
		if (index > 0) this.resetAchievementCategory(index);
	}
	return this._categoryMap[title];
};

Game_Achievements.prototype.show = function() {
	this._visible = true;
};

Game_Achievements.prototype.hide = function() {
	this._visible = false;
};

Game_Achievements.prototype.isVisible = function() {
	return this._visible;
};

Game_Achievements.prototype.enable = function() {
	this._enabled = true;
};

Game_Achievements.prototype.disable = function() {
	this._enabled = false;
};

Game_Achievements.prototype.isEnabled = function() {
	return this._enabled;
};

Game_Achievements.prototype.checkRewards = function() {
	if (!Horsti.AS.usePoints || !Horsti.AS.useRewards) return;
	for (var i = 0; i < this._rewards.length; ++i) {
		reward = this.reward(i);
		if (!reward) continue;
		if (!reward.isCompleted() && reward.getPoints() <= this._points) {
			reward.setCompleted(true);
			this.distributePointReward(reward.getReward());
			$gameParty.pushAchievementAlert(i, 'reward', false);
		}
	}
};

Game_Achievements.prototype.distributePointReward = function(reward) {
	Horsti.AS.evalRewardCode(reward);
	return Horsti.AS.distributeReward(reward);
};

Game_Achievements.prototype.getPoints = function() {
	return this._points;
};

Game_Achievements.prototype.gainPoints = function(amount) {
	if (!Horsti.AS.usePoints) return;
	this._points += amount;
	this.checkRewards();
};

Game_Achievements.prototype.showAllAchievements = function(amount) {
	this._data.forEach(function(a) {
		if (a) {
			a.show();
			a.reveal();
		}
	});
};

//=============================================================================
// Game_Achievement
//=============================================================================

function Game_Achievement() {
	this.initialize.apply(this, arguments);	
}

Game_Achievement.prototype.initialize = function(index) {
	this._index           = index;
	this._concealed       = this.data().concealed;
	this._visible         = this.data().visible;
	this._categories      = Horsti.Utils.deepCopy(this.data().categories);
	this._progress        = 0;
	this._tier            = 0;
	this._repeated        = 0;
	this._rewardedPoints  = 0;
	this._completed       = false;
};

Game_Achievement.prototype.data = function() {
	return $dataAchievements[this._index];
};

Game_Achievement.prototype.getTitle = function() {
	return this.data().title;
};

Game_Achievement.prototype.getCompletedTitle = function() {
	return this.data().completedTitle.format(this.getTitle());
};

Game_Achievement.prototype.getDescription = function() {
	var description = this.data().description;
	var tierGoal = this.getCurrentTierGoal();
	var maxTierGoal = this.getMaxTierGoal();
	return description.format(tierGoal, maxTierGoal);
};

Game_Achievement.prototype.isVisible = function() {
	return this._visible;
};

Game_Achievement.prototype.isConcealed = function() {
	return this._concealed;
};

Game_Achievement.prototype.getCategories = function() {
	return this._categories;
};

Game_Achievement.prototype.getProgress = function() {
	return this._progress;
};

Game_Achievement.prototype.getTiers = function() {
	return this.data().tiers;
};

Game_Achievement.prototype.getTier = function(index) {
	if (index < 0  || index >= this.getTiers().length) return undefined;
	return this.getTiers()[index];
};

Game_Achievement.prototype.getTierGoal = function(index) {
	return Number(this.getTier(index)['Progress']);
};

Game_Achievement.prototype.getMaxTier = function() {
	var index = this.getTiers().length - 1;
	return this.getTier(index);
};

Game_Achievement.prototype.getMaxTierIndex = function() {
	return this.getTiers().length - 1;
};

Game_Achievement.prototype.getMaxTierGoal = function() {
	return Number(this.getMaxTier()['Progress']);
};

Game_Achievement.prototype.getCurrentTier = function() {
	return this.getTier(this.getCurrentTierIndex().clamp(0, this.getMaxTierIndex()));
};

Game_Achievement.prototype.getCurrentTierIndex = function() {
	return this._tier;
};

Game_Achievement.prototype.getCurrentTierGoal = function() {
	return Number(this.getCurrentTier()['Progress']);
};

Game_Achievement.prototype.getAmountRepeatable = function() {
	return Number(this.data().repeatable);
};

Game_Achievement.prototype.getAmountRepeated = function() {
	return this._repeated;
};

Game_Achievement.prototype.isRepeatable = function() {
	return this.getAmountRepeatable() !== 1;
};

Game_Achievement.prototype.getMaxPoints = function() {
	return this.data().maxPoints;
};

Game_Achievement.prototype.hasPointLimit = function() {
	return this.getMaxPoints() > 0;
};

Game_Achievement.prototype.getTotalTierPoints = function() {
	return this.getTiers().map(function(tier) {
		return Number(tier['Points']);
	}).reduce(function(acc, val) {
		return acc + val;
	});
};

Game_Achievement.prototype.getRewardedPoints = function() {
	return this._rewardedPoints;
};

Game_Achievement.prototype.getReward = function() {
	return this.data().reward;
};

Game_Achievement.prototype.getRewardMode = function() {
	return this.data().rewardMode;
};

Game_Achievement.prototype.getSortValue = function() {
	var code = this.data().sortValue;
	var value = 0;
	try {
		value = eval(code);
	}
	catch (e) {
		console.error('Invalid sort value \'%1\' code for achievement %2'.format(code, this._index));
		console.error(e);
	}
	return value;
};

Game_Achievement.prototype.show = function() {
	this._visible = true;
};

Game_Achievement.prototype.hide = function() {
	this._visible = false;
};

Game_Achievement.prototype.reveal = function() {
	this._concealed = false;
};

Game_Achievement.prototype.conceal = function() {
	this._concealed = true;
};

Game_Achievement.prototype.isCompleted = function() {
	return this._completed;
};

//legacy
Game_Achievement.prototype.allDone = function() {
	return this.isCompleted();
};

Game_Achievement.prototype.addCategory = function(category) {
	if ($gameParty.achievements().isRewardsCategory(category)) return;
	if (!Number(category)) {
		if (this._categories.indexOf(category) < 0) {
			this._categories.push(category);
			$gameParty.achievements().resetCategoryAchievements();
		}
	}
	else {
		var categoryName = $gameParty.achievementCategory(Number(category)).getTitle();
		if (this._categories.indexOf(categoryName) < 0) {
			this._categories.push(categoryName);
			$gameParty.achievements().resetCategoryAchievements();
		}
	}
};

Game_Achievement.prototype.setCategories = function(categories) {
	if (!Number(categories) && typeof categories === 'string') {
		this._categories = [categories];
	}
	else if (Number(categories) || typeof categories === 'number') {
		this._categories = [$gameParty.achievementCategory(categories).getTitle()];
	}
	else /* array */ {
		this._categories = categories.map(function(category) {
			if (Number(category) || typeof category === 'number')
				return $gameParty.achievementCategory(category).getTitle();
			return category;
		}).filter(function(category) {
			return !$gameParty.achievements().isRewardsCategory(category);
		});
	}
	$gameParty.achievements().resetCategoryAchievements();
};

Game_Achievement.prototype.removeCategory = function(removedCategory) {
	if (Number(removedCategory) || typeof removedCategory === 'number') 
		removedCategory = $gameParty.achievementCategory(Number(removedCategory)).getTitle();
	this._categories = this._categories.filter(function(category) {
		return category !== removedCategory;
	});
	$gameParty.achievements().resetCategoryAchievements();
};

Game_Achievement.prototype.drawListTitle = function(window, index) {
	var rect = window.itemRect(index);
	rect.x += Horsti.AS.achievementIndent;
	if (!this.isConcealed()) {
		var title = this.isCompleted() ? this.getCompletedTitle() : this.getTitle();
		window.drawTextEx(title, rect.x, rect.y);
	}
	else {
		var title = Horsti.AS.concealedAchievement.format(this.getTitle());
		window.drawTextEx(title, rect.x, rect.y);
	}
};

Game_Achievement.prototype.checkCompletion = function() {
	if (this.isCompleted()) {
		this._tier = this.getMaxTierIndex() + 1;
		this._progress = this.getMaxTierGoal();
		return;
	}
	while (this._progress >= this.getCurrentTierGoal()) {
		this._tier++;
		if (this._tier >= this.getTiers().length) {
			if (this._repeated >= Number.MAX_SAFE_INTEGER) continue; // 
			this._repeated++;
			if (this._repeated < this.getAmountRepeatable() || this.getAmountRepeatable() === 0) {
				this.completeRepeatable();
			}
			else {
				this.complete();
				break;
			}
		}
		else {
			this.completeCurrentTier();
		}
	}
	this._tier.clamp(0, this.getMaxTierIndex() + 1);
	this._progress.clamp(0, this.getMaxTierGoal());
};

Game_Achievement.prototype.completeCurrentTier = function() {
	if (!$gameSystem.silentAchievementCompletionEnabled()) {
		this.show();
		this.reveal();
	}
	$gameParty.pushAchievementAlert(this._index, 'progress', false);
	var tier = this.getTier(this._tier - 1);
	var points = Number(tier['Points']);
	if (this.hasPointLimit()) 
		points = Math.min(points, this.getMaxPoints() - this.getRewardedPoints());
	this._rewardedPoints += points;
	$gameParty.achievements().gainPoints(points);
	var code = tier['Eval'];
	if (!code) return;
	Horsti.Utils.evalCode(code, 'Failed to execute custom code for tier ' + this._tier + ' of achievement ' + this._index + '.');
};

Game_Achievement.prototype.completeRepeatable = function() {
	this._progress -= this.getMaxTierGoal();
	var reward = false;
	if (this.getRewardMode() === 0 || (this.getRewardMode() === 1 && this._repeated === 1)) {
		reward = this.distributeAchievementReward();
	}
	if (!$gameSystem.silentAchievementCompletionEnabled()) {
		this.show();
		this.reveal();
	}
	$gameParty.pushAchievementAlert(this._index, 'completion', reward);
	var points = Number(this.getMaxTier()['Points']);
	if (this.getMaxPoints() > 0) 
		points = Math.min(points, this.getMaxPoints() - this.getRewardedPoints());
	this._rewardedPoints += points;
	$gameParty.achievements().gainPoints(points);
	this._tier = 0;
};

Game_Achievement.prototype.complete = function() {
	this._completed = true;
	var reward = false;
	if (!(this.getRewardMode() === 1 && this.isRepeatable())) {
		reward = this.distributeAchievementReward();
	}
	if (!$gameSystem.silentAchievementCompletionEnabled()) {
		this.show();
		this.reveal();
	}
	$gameParty.pushAchievementAlert(this._index, 'completion', reward);
	var points = Number(this.getMaxTier()['Points']);
	if (this.hasPointLimit()) 
		points = Math.min(points, this.getMaxPoints() - this.getRewardedPoints());
	this._rewardedPoints += points;
	$gameParty.achievements().gainPoints(points);
	this._tier = this.getMaxTierIndex() + 1;
};

Game_Achievement.prototype.setProgress = function(amount) {
	if (this.isCompleted() || this._progress === amount) return;
	this._progress = amount;
	this.checkCompletion();
};

Game_Achievement.prototype.addProgress = function(amount) {
	if (this.isCompleted() || amount === 0) return;
	this._progress += amount;
	this.checkCompletion();
};

Game_Achievement.prototype.hasReward = function() {
	var reward = this.getReward();
	return Horsti.AS.isReward(reward);
};

Game_Achievement.prototype.distributeAchievementReward = function() {
	var reward = this.getReward();
	if (!reward) return false;
	Horsti.AS.evalRewardCode(reward);
	return Horsti.AS.distributeReward(reward);
};

Game_Achievement.prototype.isCategory = function() {
	return false;
};

Game_Achievement.prototype.isAchievement = function() {
	return true;
};

Game_Achievement.prototype.isReward = function() {
	return false;
};

//=============================================================================
// Game_AchievementCategory
//=============================================================================

function Game_AchievementCategory() {
	this.initialize.apply(this, arguments);	
}

Game_AchievementCategory.prototype.initialize = function(index) {
	this._index = index;
	this._expanded = false;
	this._concealed = this.data().concealed;
	this._visible = this.data().visible;
	this._achievements = [];
};

Game_AchievementCategory.prototype.data = function() {
	return $dataAchievementCategories[this._index];
};

Game_AchievementCategory.prototype.getTitle = function() {
	return this.data().title;
};

Game_AchievementCategory.prototype.getDescription = function() {
	return this.data().description;
};

Game_AchievementCategory.prototype.isVisible = function() {
	return this._visible;
};

Game_AchievementCategory.prototype.isConcealed = function() {
	return this._concealed;
};

Game_AchievementCategory.prototype.conceal = function() {
	this._concealed = true;
	this.setExpanded(false);
};

Game_AchievementCategory.prototype.reveal = function() {
	this._concealed = false;
};

Game_AchievementCategory.prototype.show = function() {
	this._visible = true;
};

Game_AchievementCategory.prototype.hide = function() {
	this._visible = false;
};

Game_AchievementCategory.prototype.getAchievements = function() {
	return this._achievements;
};

Game_AchievementCategory.prototype.setAchievements = function(value) {
	this._achievements = value;
};

Game_AchievementCategory.prototype.isExpanded = function() {
	return this._expanded;
};

Game_AchievementCategory.prototype.setExpanded = function(value) {
	this._expanded = value;
};

Game_AchievementCategory.prototype.addAchievement = function(achievement) {
	this._achievements.push(achievement);
};

Game_AchievementCategory.prototype.drawListTitle = function(window, index) {
	var rect = window.itemRect(index);
	var prefix = this.isExpanded() ? Horsti.AS.prefixExpanded : Horsti.AS.prefixCollapsed;
	if (this.isConcealed()) {
		var title = prefix + Horsti.AS.concealedCategory.format(this.getTitle());
		window.drawTextEx(title, rect.x, rect.y);
	}
	else {
		var title = prefix + this.getTitle();
		window.drawTextEx(title, rect.x, rect.y);
	}
};

Game_AchievementCategory.prototype.isEmpty = function() {
	return this._achievements.length === 0;
};

Game_AchievementCategory.prototype.isCategory = function() {
	return true;
};

Game_AchievementCategory.prototype.isAchievement = function() {
	return false;
};

Game_AchievementCategory.prototype.isReward = function() {
	return false;
};

//=============================================================================
// Game_AchievementPointReward
//=============================================================================

function Game_AchievementPointReward() {
	this.initialize.apply(this, arguments);	
}

Game_AchievementPointReward.prototype.initialize = function(index) {
	this._index       = index;
	this._visible     = true;
	this._completed   = false;
};

Game_AchievementPointReward.prototype.data = function() {
	return $dataAchievementRewards[this._index];
};

Game_AchievementPointReward.prototype.getTitle = function() {
	return Horsti.AS.pointRewardsFormat.format(this.getPoints());
};

Game_AchievementPointReward.prototype.getCompletedTitle = function() {
	return Horsti.AS.pointRewardsCompletedFormat.format(this.getPoints());
};

Game_AchievementPointReward.prototype.getPoints = function() {
	return this.data().points;
};

Game_AchievementPointReward.prototype.getReward = function() {
	return this.data();
};

Game_AchievementPointReward.prototype.drawListTitle = function(window, index) {
	var rect = window.itemRect(index);
	rect.x += Horsti.AS.achievementIndent;
	var title = this.isCompleted() ? this.getCompletedTitle() : this.getTitle();
	window.drawTextEx(title, rect.x, rect.y);
};

Game_AchievementPointReward.prototype.isCompleted = function() {
	return this._completed;
};

// legacy
Game_AchievementPointReward.prototype.allDone = function() {
    return this.isCompleted();
};

Game_AchievementPointReward.prototype.setCompleted = function(value) {
	return this._completed = value;
};

Game_AchievementPointReward.prototype.isVisible = function() {
	return this._visible;
};

Game_AchievementPointReward.prototype.getSortValue = function() {
	return 0;
};

Game_AchievementPointReward.prototype.isCategory = function() {
	return false;
};

Game_AchievementPointReward.prototype.isAchievement = function() {
	return false;
};

Game_AchievementPointReward.prototype.isReward = function() {
	return true;
};

//=============================================================================
// Scene_Map
//=============================================================================

Horsti.AS.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	Horsti.AS.Scene_Map_update.call(this);
	this.updateAchievementAlert();
};

Scene_Map.prototype.updateAchievementAlert = function() {
	if ($gameParty.hasPendingAlerts() && this.isActive()) {
		if (!this._window_achievementAlert) {
			this._window_achievementAlert = new Window_AchievementAlert($gameParty.getNextAlert());
			this.addWindow(this._window_achievementAlert);
		}
		else if (this._window_achievementAlert.isDisposable()) {
			this._windowLayer.removeChild(this._window_achievementAlert);
			this._window_achievementAlert = undefined;
		}
	}
};

//=============================================================================
// Scene_Menu
//=============================================================================

if (!Imported.YEP_MainMenuManager) {

Horsti.AS.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	Horsti.AS.Scene_Menu_createCommandWindow.call(this);
	this._commandWindow.setHandler('achievements', this.commandAchievements.bind(this));
};

} // !Imported.YEP_MainMenuManager

Scene_Menu.prototype.commandAchievements = function() {
	SceneManager.push(Scene_Achievements);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================

if (!Imported.YEP_MainMenuManager) {

Horsti.AS.Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	Horsti.AS.Window_MenuCommand_addOriginalCommands.call(this);
	if ($gameSystem.achievementsVisible()) {
		var enabled = $gameSystem.achievementsEnabled();
		this.addCommand(Horsti.AS.commandName, 'achievements', enabled);
	}
};

} // !Imported.YEP_MainMenuManager

//=============================================================================
// Scene_Achievements
//=============================================================================

function Scene_Achievements() {
	this.initialize.apply(this, arguments);	
}

Scene_Achievements.prototype = Object.create(Scene_Base.prototype);
Scene_Achievements.prototype.constructor = Scene_Achievements;

Scene_Achievements.prototype.initialize = function() {
	Scene_Base.prototype.initialize.call(this);
};

/*
Scene_Achievements.prototype.start = function() {
	Scene_Base.prototype.start.call(this);
};
*/

Scene_Achievements.prototype.create = function() {
	Scene_Base.prototype.create.call(this);
	this.createBackground();
	this.createWindowLayer();
	this.createWindows();
};

Scene_Achievements.prototype.createBackground = function() {
	this._backgroundSprite = new Sprite();
	if (!Horsti.AS.sceneBackground) this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
	else this._backgroundSprite.bitmap = ImageManager.loadPicture(Horsti.AS.sceneBackground);
	this.addChild(this._backgroundSprite);
};

Scene_Achievements.prototype.createWindows = function() {
	this._windowTitle = new Window_AchievementTitle();
	this._windowList = new Window_AchievementList();
	this._windowData = new Window_AchievementData();
	this._windowData.setHandler('cancel', this.cancelData.bind(this));
	this._windowList.setDataWindow(this._windowData);
	this.addWindow(this._windowTitle);
	this.addWindow(this._windowList);
	this.addWindow(this._windowData);
};

Scene_Achievements.prototype.update = function() {
	Scene_Base.prototype.update.call(this);
	this.updateScene();
};

Scene_Achievements.prototype.updateScene = function() {
	if (Input.isTriggered('cancel') || TouchInput.isCancelled()) { 
		SoundManager.playCancel();
		this.popScene();
	}
};

Scene_Achievements.prototype.cancelData = function() {
	this._windowData.deactivate();
	this._windowData.hideArrows();
	this._windowList.activate();
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.textWidthEx = function(text) {
	return this.drawTextEx(text, 0, this.contents.height);
};

//=============================================================================
// Window_AchievementTitle
//=============================================================================

function Window_AchievementTitle() {
	this.initialize.apply(this, arguments);	
}

Window_AchievementTitle.prototype = Object.create(Window_Base.prototype);
Window_AchievementTitle.prototype.constructor = Window_AchievementTitle;

Window_AchievementTitle.prototype.initialize = function() {
	var x = Math.round(eval(Horsti.AS.titleX));
	var y = Math.round(eval(Horsti.AS.titleY));
	Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
	this._openness = 255;
	this.refresh();
	this.open();
};

Window_AchievementTitle.prototype.windowWidth = function() {
	return Math.round(eval(Horsti.AS.titleWidth));
};

Window_AchievementTitle.prototype.windowHeight = function() {
	return Math.round(eval(Horsti.AS.titleHeight));
};

Window_AchievementTitle.prototype.refresh = function() {
	this.contents.clear();
	var textTitle = Horsti.AS.titleVocab;
	var x1 = 0; // left
	if (Horsti.AS.titleAlign === 'Center') {
		x1 = (this.contentsWidth() - this.textWidthEx(textTitle)) / 2;
	}
	else if (Horsti.AS.titleAlign === 'Right') {
		x1 = this.contentsWidth() - this.textWidthEx(textTitle);
	}
	this.drawTextEx(textTitle, x1, 0);
	if (Horsti.AS.usePoints) {
		var textPoints = Horsti.AS.totalPointsVocab.format($gameParty.achievements().getPoints());
		var x2 = (this.contentsWidth() - this.textWidthEx(textPoints));
		this.drawTextEx(textPoints, x2, 0);
	}
};

//=============================================================================
// Window_AchievementList
//=============================================================================

function Window_AchievementList() {
	this.initialize.apply(this, arguments);	
}

Window_AchievementList.prototype = Object.create(Window_Selectable.prototype);
Window_AchievementList.prototype.constructor = Window_AchievementList;

Window_AchievementList.prototype.initialize = function() {
	var x = Math.round(eval(Horsti.AS.listX));
	var y = Math.round(eval(Horsti.AS.listY));
	Window_Selectable.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
	this._openness = 255;
	this._data = [];
	this.setHandler("ok", this.expand.bind(this));
	this.select(0);
	this.refresh();
	this.open();
	this.activate();
};

Window_AchievementList.prototype.windowWidth = function() {
	return Math.round(eval(Horsti.AS.listWidth));
};

Window_AchievementList.prototype.windowHeight = function() {
	return Math.round(eval(Horsti.AS.listHeight));
};

Window_AchievementList.prototype.setDataWindow = function(window) {
	this._windowData = window;
};

Window_AchievementList.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	this.updateKeyboardJumping();
	this.updateItem();
};

Window_AchievementList.prototype.updateKeyboardJumping = function() {
	if (Input.isTriggered('left')) {
		this.jumpUp();
	}
	if (Input.isTriggered('right')){
		this.jumpDown();
	}
};

Window_AchievementList.prototype.jumpDown = function() {var i = this._index
	for (var i = this.index() + 1; i < this._data.length; ++i) {
		if (this._data[i].isCategory()) {
			this.select(i);
			SoundManager.playCursor();
			return;
		}
	}
};

Window_AchievementList.prototype.jumpUp = function() {
	for (var i = this.index() - 1; i >= 0; --i) {
		if (this._data[i].isCategory()) {
			this.select(i);
			SoundManager.playCursor();
			return;
		}
	}
};

Window_AchievementList.prototype.updateItem = function() {
	if (this._windowData) {
		if (this.item()) this._windowData.setItem(this.item());
		else this._windowData.setItem(undefined);
	}
};

Window_AchievementList.prototype.refresh = function() {
	this.clearCommandList();
	this.makeCommandList();
	this.contents.clear();
	this.drawAllItems();
};

Window_AchievementList.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};

Window_AchievementList.prototype.clearCommandList = function() {
	this._data = [];
};

Window_AchievementList.prototype.makeCommandList = function() {
	var categoriesList = [];
	for (var i = 0; i < $dataAchievementCategories.length; ++i) {
		var category = $gameParty.achievementCategory(i);
		if (!category || !category.isVisible()) continue;
		var achievementsList = { category: category, list: [] };
		if (category.isExpanded()) {
			for (var j = 0; j < category.getAchievements().length; ++j) {
				var achievement = category.getAchievements()[j];
				if (!achievement || !achievement.isVisible()) continue;
				if (achievement && achievement.isVisible()) {
					achievementsList.list.push(achievement);
				}
			}
		}
		categoriesList.push(achievementsList);
	}
	for (var i = 0; i < categoriesList.length; ++i) {
		var achievementsList = categoriesList[i];
		achievementsList.list.sort(function(a, b) {
			return a.getSortValue() - b.getSortValue();
		});
		this._data.push(achievementsList.category);
		for (var j = 0; j < achievementsList.list.length; ++j) {
			this._data.push(achievementsList.list[j]);
		}
	}
};

Window_AchievementList.prototype.item = function() {
	index = this.index();
	return ((!!this._data && index >= 0) ? this._data[index] : undefined);
};

Window_AchievementList.prototype.drawItem = function(index) {
	var item = this._data[index];
	if (!!item) item.drawListTitle(this, index);
};

Window_AchievementList.prototype.expand = function() {
	var item = this.item();
	if (!item) {
		this.activate();
		return;
	}
	if (item.isCategory()) {
		if (item.isConcealed() && item.isExpanded()) {
			item.setExpanded(false);
			this.refresh();
		}
		else if (!item.isConcealed()) {
			item.setExpanded(!item.isExpanded());
			this.refresh();
		}
		this.activate();
	}
	else if (item.isAchievement() && item.isConcealed()) {
		this.activate();
	}
	else this.focusDataWindow();
};

Window_AchievementList.prototype.focusDataWindow = function() {
	this.deactivate();
	this._windowData.activate();
	this._windowData.updateArrows(true);
};

//=============================================================================
// Window_AchievementData
//=============================================================================

function Window_AchievementData() {
	this.initialize.apply(this, arguments);	
}

Window_AchievementData.prototype = Object.create(Window_Selectable.prototype);
Window_AchievementData.prototype.constructor = Window_AchievementData;

Window_AchievementData.prototype.initialize = function() {
	var x = Math.round(eval(Horsti.AS.dataX));
	var y = Math.round(eval(Horsti.AS.dataY));
	Window_Selectable.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
	this._openness = 255;
	this._item = undefined;
	this._lastItem = undefined;
	this._currentHeight = 0;
	this.resetFontSettings();
	this.calcAllTextHeight();
	this.open();
};

Window_AchievementData.prototype.windowWidth = function() {
	return Math.round(eval(Horsti.AS.dataWidth));
};

Window_AchievementData.prototype.windowHeight = function() {
	return Math.round(eval(Horsti.AS.dataHeight));
};

Window_AchievementData.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	this.updateItem();
	if (this.isOpenAndActive()) this.updateKeyboardScrolling();
};

Window_AchievementData.prototype.updateItem = function() {
	if (this._item === this._lastItem) return;
	this._lastItem = this._item;
	this.origin.y = 0;
	this.resetFontSettings();
	this.calcAllTextHeight();
	if (!!this._item) {
		this._currentHeight = 0;
		if (this._item.isCategory()) {
			if (!this._item.isConcealed()) this.drawCategory();
			else this.contents.clear();
		}
		else if (this._item.isAchievement()) {
			if (!this._item.isConcealed()) this.drawAchievement();
			else this.contents.clear();
		}
		else /* is reward */ {
			this.drawAchievementPointReward();
		}
	}
	else this.contents.clear();
};

Window_AchievementData.prototype.updateKeyboardScrolling = function() {
	if (Input.isPressed('up')){
		this.scrollUp(false);
	}
	else if (Input.isPressed('down')){
		this.scrollDown(false);
	}
	else if (Input.isPressed('pageup')){
		this.scrollUp(true);
	}
	else if (Input.isPressed('pagedown')){
		this.scrollDown(true);
	}
};

Window_AchievementData.prototype.updateArrows = function(forced) {
	if (!forced && this._lastY === this.origin.y) return;
	this._lastY = this.origin.y;
	this.upArrowVisible = this.origin.y > 0;
	this.downArrowVisible = this.origin.y < this.contentsHeight() - this.height + this.standardPadding() * 2;
};

Window_AchievementData.prototype.calcTextHeight = function(textState, all) {
	var lastFontSize = this.contents.fontSize;
	var textHeight = 0;
	var lines = textState.text.slice(textState.index).split('\n');
	var maxLines = all ? lines.length : 1;

	for (var i = 0; i < maxLines; i++) {
		var maxFontSize = this.contents.fontSize;
		var regExp = /\x1b[\{\}]/g;
		// find first char in line thats not \{ or \} (does not completely work)
		var escapeRegex = /[^\x1b\{\}]/;
		var escapeArray = escapeRegex.exec(lines[i]);
		var firstNonEscapeChar = 0;
		if (escapeArray) {
			firstNonEscapeChar = escapeArray['index'];
		}
		// end
		for (;;) {
			var array = regExp.exec(lines[i]);
			if (array) {
				if (array[0] === '\x1b{') {
					this.makeFontBigger();
				}
				if (array[0] === '\x1b}') {
					this.makeFontSmaller();
					// by default, the code does not consider any amount of \} at the beginning of each line
					if (array['index'] < firstNonEscapeChar) {
						maxFontSize = this.contents.fontSize;
					}
					// end
				}
				if (maxFontSize < this.contents.fontSize) {
					maxFontSize = this.contents.fontSize;
				}
			} else {
				break;
			}
		}
		// addition to account for icons
		var regExp2 = /\x1bi\[\d+\]/;
		if (lines[i].match(regExp2)) {
			maxFontSize = Math.max(maxFontSize, 28);
		}
		// end
		textHeight += maxFontSize + 8;
	}

	this.contents.fontSize = lastFontSize;
	return textHeight;
};

Window_AchievementData.prototype.textHeightEx = function(text, x, y) {
	if (!text) return 0;
	var textState = { index: 0, x: x, y: y, left: x, text: this.convertEscapeCharacters(text) };
	textState.height = this.calcTextHeight(textState, true);
	return textState.height;
};

Window_AchievementData.prototype.contentsHeight = function() {
	var defaultHeight = this.windowHeight() - this.standardPadding() * 2;
	if (!this._item) return defaultHeight;
	return Math.max(this._allTextHeight, defaultHeight);
};

Window_AchievementData.prototype.calcAllTextHeight = function() {
	var calcTitleHeight = function(window, item) {
		var text = '';
		if (item.isAchievement()) text = item.isCompleted() ? item.getCompletedTitle() : item.getTitle();
		else text = item.getTitle();
		return window.textHeightEx(text, 0, 0);
	}
	var calcProgressHeight = function(window, item) {
		var maximum = '';
		var progress = '';
		if (item.isAchievement()) {
			maximum = (($gameSystem.getProgressMode() <= 1) ? item.getCurrentTierGoal() : item.getMaxTierGoal());
			progress = Math.min(maximum, item.getProgress());
			if (!item.isCompleted() && $gameSystem.getProgressMode() === 1 && item.getCurrentTierIndex() > 0) {
				var previousTierGoal = item.getTierGoal(item.getCurrentTierIndex() - 1);
				maximum -= previousTierGoal;
				progress -= previousTierGoal;
			}
		}
		else /* reward */ {
			maximum = item.getPoints();
			progress = Math.min(maximum, $gameParty.achievements().getPoints());
		}
		var percentage = Math.min(100, Math.floor(progress / maximum * 100));
		var text1 = Horsti.AS.progressVocab.format(progress, maximum, percentage);
		if (item.isAchievement()) {
			var tier = item.getCurrentTierIndex();
			var amountTiers = item.getTiers().length;
			var text2 = Horsti.AS.tierVocab.format(tier, amountTiers);
			return Math.max(window.textHeightEx(text1, 0, 0), window.textHeightEx(text2, 0, 0)) + window.lineHeight();
		}
		return window.textHeightEx(text1, 0, 0) + window.lineHeight(); // + line height for progress bar
	}
	var calcDescriptionHeight = function(window, item) {
		var text = item.getDescription();
		if (!text) return 0;
		var height = window.textHeightEx(text, 0, 0);
		return height;
	}
	var calcRewardHeight = function(window, item) {
		var reward = item.getReward();
		if (!Horsti.AS.useRewards || !Horsti.AS.isReward(reward)) return 0;
		var list = window.makeRewardsList(reward);
		var height = list.map(function(item) {
			return window.textHeightEx(item, 0, 0);
		}).reduce(function(acc, val) {
			return acc + val;
		}, 0) + window.textHeightEx(Horsti.AS.rewardVocab, 0, 0) + window.lineHeight(); // for 'Reward' text and horz line
		return height;
	}
	var calcPointsHeight = function(window, item) {
		if (!Horsti.AS.usePoints || item.getTotalTierPoints() === 0) return 0;
		var height1 = window.textHeightEx(Horsti.AS.pointVocabNext.format(0));
		var height2 = window.textHeightEx(Horsti.AS.pointVocabTotal.format(0, 0));
		if (!(item.getAmountRepeatable() === 0 && item.getMaxPoints() === 0)) {
			return Math.max(height1, height2);
		}
		var height3 = window.textHeightEx(Horsti.AS.pointVocabInfinite.format(0));
		return Math.max(height1, Math.max(height2, height3));
	}
	var calcRepeatableHeight = function(window, item) {
		if (!item.isRepeatable()) return 0;
		var repeatable = item.getAmountRepeatable();
		var repeated = item.getAmountRepeated();
		var text = '';
		if (repeatable === 0) text = Horsti.AS.repeatableVocabInfinite.format(repeated);
		else text = Horsti.AS.repeatableVocab.format(repeated, repeatable);
		return window.textHeightEx(text, 0, 0) + window.lineHeight();
	}
	if (!this._item) {
		this._allTextHeight = 0;
		return;
	};
	var height = 0;
	if (this._item.isAchievement()) {
		if (this._item.isConcealed()) {
			this._allTextHeight = 0;
			return;
		}
		height += calcTitleHeight(this, this._item);
		height += this.lineHeight(); // line
		height += calcProgressHeight(this, this._item);
		height += calcPointsHeight(this, this._item);
		height += this.lineHeight(); // line
		height += calcDescriptionHeight(this, this._item);
		height += calcRewardHeight(this, this._item);
		height += calcRepeatableHeight(this, this._item);
	}
	else if (this._item.isCategory()) {
		height += calcTitleHeight(this, this._item);
		height += this.lineHeight(); // blank space
		height += calcDescriptionHeight(this, this._item);
	}
	else if (this._item.isReward()) {
		height += calcTitleHeight(this, this._item);
		height += this.lineHeight(); // line
		height += calcProgressHeight(this, this._item);
		height += calcRewardHeight(this, this._item);
	}
	this._allTextHeight = height;
};

// dont delete
Window_AchievementData.prototype.select = function(index) {};

Window_AchievementData.prototype.setItem = function(item) {
	this._item = item;
};

Window_AchievementData.prototype.currentHeight = function() {
	return this._currentHeight;
};

Window_AchievementData.prototype.scrollDown = function(fast) {
	var maximum = this.contentsHeight() - this.windowHeight() + this.standardPadding() * 2;
	this.origin.y = Math.min(maximum, this.origin.y + (fast ? 16 : 4));
};

Window_AchievementData.prototype.scrollUp = function(fast) {
	this.origin.y = Math.max(0, this.origin.y - (fast ? 16 : 4));
};

Window_AchievementData.prototype.hideArrows = function() {
	this.upArrowVisible = false;
	this.downArrowVisible = false;
};

Window_AchievementData.prototype.processWheel = function() {
	if (!this.isOpenAndActive()) return;
	var threshold = 20;
	if (TouchInput.wheelY >= threshold) {
		this.scrollDown(true);
	}
	if (TouchInput.wheelY <= -threshold) {
		this.scrollUp(true);
	}
};

Window_AchievementData.prototype.drawCategory = function() {
	this.createContents();
	this.drawTitle();
	this.drawHorzLine();
	this.drawDescription();
};

Window_AchievementData.prototype.drawAchievement = function() {
	this.createContents();
	this.drawTitle();
	this.drawHorzLine();
	this.drawProgressBar();
	if (Horsti.AS.usePoints && this._item.getTotalTierPoints() > 0) {
		this.drawPoints();
	}
	this.drawHorzLine();
	this.drawDescription();
	if (Horsti.AS.useRewards && this._item.hasReward()) {
		this.drawHorzLine();
		this.drawReward();
	}
	if (this._item.isRepeatable()) {
		this.drawHorzLine();
		this.drawRepeatable();
	}
};

Window_AchievementData.prototype.drawAchievementPointReward = function() {
	this.createContents();
	this.drawTitle();
	this.drawHorzLine();
	this.drawRewardProgressBar();
	this.drawHorzLine();
	this.drawReward();
};

Window_AchievementData.prototype.drawTitle = function() {
	var text = this._item.getTitle();
	var x = (this.contentsWidth() - this.textWidthEx(text)) / 2;
	this.resetFontSettings();
	var height = this.textHeightEx(text, 0, 0);
	this.drawTextEx(text, x, this.currentHeight());
	this._currentHeight += height;
};

Window_AchievementData.prototype.drawDescription = function() {
	var text = this._item.getDescription();
	var x = 0;
	var y = this.currentHeight();
	text = this.convertEscapeCharacters(text);
	this.resetFontSettings();
	var height = this.textHeightEx(text, 0, 0);
	this.drawTextEx(text, x, y);
	this._currentHeight += height;
};

Window_AchievementData.prototype.drawProgressBar = function() {
	var maximum = (($gameSystem.getProgressMode() <= 1) ? this._item.getCurrentTierGoal() : this._item.getMaxTierGoal());
	var progress = Math.min(maximum, this._item.getProgress());
	if (!this._item.isCompleted() && $gameSystem.getProgressMode() === 1 && this._item.getCurrentTierIndex() > 0) {
		var previousTierGoal = this._item.getTierGoal(this._item.getCurrentTierIndex() - 1);
		maximum -= previousTierGoal;
		progress -= previousTierGoal;
	}
	var percentage = Math.min(100, Math.floor(progress / maximum * 100));
	var textProgress = Horsti.AS.progressVocab.format(progress, maximum, percentage);
	var tier = this._item.getCurrentTierIndex();
	var amountTiers = this._item.getTiers().length;
	var textTiers = Horsti.AS.tierVocab.format(tier, amountTiers);
	this.resetFontSettings();
	var height1 = this.textHeightEx(textProgress, 0, 0);
	var height2 = this.textHeightEx(textTiers, 0, 0);
	this.drawTextEx(textProgress, 0, this.currentHeight());
	this.drawTextEx(textTiers, (this.contentsWidth() - this.textWidthEx(textTiers)), this.currentHeight());
	this._currentHeight += Math.max(height1, height2);
	var rate = progress / maximum;
	var color = this.textColor(23);
	this.drawGauge(0, this.currentHeight(), this.contentsWidth(), rate, color, color);
	this._currentHeight += this.lineHeight();
};

Window_AchievementData.prototype.drawRewardProgressBar = function() {
	var points = this._item.getPoints();
	var progress = Math.min(points, $gameParty.achievements().getPoints());
	var percentage = Math.min(100, Math.floor(progress / points * 100));
	var text = Horsti.AS.progressVocab.format(progress, points, percentage);
	this.resetFontSettings();
	var height = this.textHeightEx(text, 0, 0);
	this.drawText(text, 0, this.currentHeight(), this.contentsWidth(), "left");
	this._currentHeight += height;
	var rate = progress / points;
	var color = this.textColor(23);
	this.drawGauge(0, this.currentHeight(), this.contentsWidth(), rate, color, color);
	this._currentHeight += this.lineHeight();
};

Window_AchievementData.prototype.drawPoints = function() {
	var height1 = 0;
	if (!this._item.isCompleted()) {
		var nextPoints = this._item.getCurrentTier()['Points'];
		var textNext = Horsti.AS.pointVocabNext.format(nextPoints);
		this.resetFontSettings();
		height1 = this.textHeightEx(textNext, 0, 0);
		this.drawTextEx(textNext, 0, this.currentHeight());
	}
	var totalTierPoints = this._item.getTotalTierPoints();
	var rewardedPoints = this._item.getRewardedPoints();
	var textTotal = '';
	if (this._item.hasPointLimit()) {
		var totalPoints = this._item.getMaxPoints();
		textTotal = Horsti.AS.pointVocabTotal.format(rewardedPoints, totalPoints);
	}
	else if (this._item.getAmountRepeatable() > 0 && this._item.getMaxPoints() === 0) {
		var totalPoints = totalTierPoints * this._item.getAmountRepeatable();
		textTotal = Horsti.AS.pointVocabTotal.format(rewardedPoints, totalPoints);
	}
	else {
		textTotal = Horsti.AS.pointVocabInfinite.format(rewardedPoints);
	}
	this.resetFontSettings();
	var height2 = this.textHeightEx(textTotal, 0, 0);
	this.drawTextEx(textTotal, (this.contentsWidth() - this.textWidthEx(textTotal)), this.currentHeight());
	this._currentHeight += Math.max(height1, height2);
};

Window_AchievementData.prototype.drawReward = function() {
	var reward = this._item.getReward();
	if (!Horsti.AS.isReward(reward)) return;
	var text = Horsti.AS.rewardVocab;
	this.resetFontSettings();
	var height1 = this.textHeightEx(text, 0, 0);
	this.drawTextEx(text, 0, this.currentHeight());
	this._currentHeight += height1;
	var list = this.makeRewardsList(reward);
	for (var i = 0; i < list.length; ++i) {
		var text = list[i];
		text = this.convertEscapeCharacters(text);
		this.resetFontSettings();
		var height2 = this.textHeightEx(text, 0, 0);
		this.drawTextEx(text, 0, this.currentHeight());
		this._currentHeight += height2;
	}
};

Window_AchievementData.prototype.drawRepeatable = function() {
	var repeatable = this._item.getAmountRepeatable();
	var repeated = this._item.getAmountRepeated();
	var text = '';
	if (repeatable === 0) text = Horsti.AS.repeatableVocabInfinite.format(repeated);
	else text = Horsti.AS.repeatableVocab.format(repeated, repeatable);
	var x = 0;
	var y = Math.max(this.currentHeight(), this.windowHeight() - this.standardPadding() * 2 - this.lineHeight());
	this.resetFontSettings();
	var height = this.textHeightEx(text, 0, 0);
	this.drawTextEx(text, x, y);
	this._currentHeight += height;
};

Window_AchievementData.prototype.drawHorzLine = function() {
	var width = this.contentsWidth();
	var height = 4;
	var x = 0;
	var y = this.currentHeight() + (this.lineHeight() / 2 - height / 2);
	var color1 = this.textColor(Horsti.AS.horzLineColor1);
	var color2 = this.textColor(Horsti.AS.horzLineColor2);
	this.contents.gradientFillRect(x, y, width, height, color1, color2);
	this._currentHeight += this.lineHeight();
};

Window_AchievementData.prototype.makeRewardsList = function(reward) {
	var formatGroup = function(group, list, key, data) {
		for (var i = 0; i < group.length; ++i) {
			var item = group[i];
			if (!item) continue;
			var index = Number(item[key]);
			var amount = Number(item['Amount']);
			var text = Horsti.AS.rewardFormatItems.format(data[index].iconIndex, data[index].name, amount);
			list.push(text);
		}
	}
	var list = [];
	if (reward.gold > 0) list.push(Horsti.AS.rewardFormatGold.format(reward.gold));
	if (reward.exp > 0) list.push(Horsti.AS.rewardFormatExp.format(reward.exp));
	formatGroup(reward.items, list, 'Item', $dataItems);
	formatGroup(reward.weapons, list, 'Weapon', $dataWeapons);
	formatGroup(reward.armors, list, 'Armor', $dataArmors);
	list = list.concat(reward.custom);
	return list;
};

//=============================================================================
// Window_AchievementAlert
//=============================================================================

function Window_AchievementAlert() {
	this.initialize.apply(this, arguments);	
}

Window_AchievementAlert.prototype = Object.create(Window_Base.prototype);
Window_AchievementAlert.prototype.constructor = Window_AchievementAlert;

Window_AchievementAlert.prototype.initialize = function(data) {
	this._mode = data.mode;
	this._data = this._mode === 'reward' ? $gameParty.achievements().reward(data.index) : $gameParty.achievement(data.index);
	this._reward = data.reward;
	this._remainingFramesShown = Horsti.AS.alertTime;
	Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
	this._openness = 0;
	this.resetFontSettings();
	this.calcAllTextHeight();
	var x = Math.round(eval(Horsti.AS.alertX));
	var y = Math.round(eval(Horsti.AS.alertY));
	this.move(x, y, this.windowWidth(), this.windowHeight())
	this.refresh();
	this.open();
};

Window_AchievementAlert.prototype.windowWidth = function() {
	var width = Math.round(eval(Horsti.AS.alertWidth));
	return width;
};

Window_AchievementAlert.prototype.windowHeight = function() {
	return (this._allTextHeight || 0) + this.standardPadding() * 2;
};

Window_AchievementAlert.prototype.loadWindowskin = function() {
	this.windowskin = ImageManager.loadSystem(Horsti.AS.alertWindowSkin);
};

Window_AchievementAlert.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.updateRemainingFramesShown();
};

Window_AchievementAlert.prototype.updateRemainingFramesShown = function() {
	if (this.isOpen() && this._remainingFramesShown >= 0) this._remainingFramesShown--;
	if (this._remainingFramesShown <= 0) this.close();
};

Window_AchievementAlert.prototype.isDisposable = function() {
	return this._remainingFramesShown <= 0 && this.isClosed();
};

Window_AchievementAlert.prototype.refresh = function() {
	this.createContents();
	this.playSound();
	if (Horsti.AS.useRewards && this._reward) {
		this.drawRewardsAlert();
	}
	else {
		this.drawSimpleAlert();
	}
};

Window_AchievementAlert.prototype.calcAllTextHeight = function() {
	var height = 0;
	height += this.textHeightEx(this.getTitle());
	height += this.lineHeight();
	height += this.textHeightEx(this.getVocab());
	if (Horsti.AS.useRewards && this._reward) {
		height += this.textHeightEx(Horsti.AS.alertVocabAchievementReward);
	}
	this._allTextHeight = height;
};

Window_AchievementAlert.prototype.textHeightEx = function(text, x, y) {
	if (!text) return 0;
	var textState = { index: 0, x: x, y: y, left: x, text: this.convertEscapeCharacters(text) };
	textState.height = this.calcTextHeight(textState, true);
	return textState.height;
};

// copy of code for window_achievementdata :[
Window_AchievementAlert.prototype.calcTextHeight = function(textState, all) {
	var lastFontSize = this.contents.fontSize;
	var textHeight = 0;
	var lines = textState.text.slice(textState.index).split('\n');
	var maxLines = all ? lines.length : 1;

	for (var i = 0; i < maxLines; i++) {
		var maxFontSize = this.contents.fontSize;
		var regExp = /\x1b[\{\}]/g;
		// find first char in line thats not \{ or \}
		var escapeRegex = /[^\x1b\{\}]/;
		var escapeArray = escapeRegex.exec(lines[i]);
		var firstNonEscapeChar = 0;
		if (escapeArray) {
			firstNonEscapeChar = escapeArray['index'];
		}
		// end
		for (;;) {
			var array = regExp.exec(lines[i]);
			if (array) {
				if (array[0] === '\x1b{') {
					this.makeFontBigger();
				}
				if (array[0] === '\x1b}') {
					this.makeFontSmaller();
					// by default, the code does not consider any amount of \} at the beginning of each line
					if (array['index'] < firstNonEscapeChar) {
						maxFontSize = this.contents.fontSize;
					}
					// end
				}
				if (maxFontSize < this.contents.fontSize) {
					maxFontSize = this.contents.fontSize;
				}
			} else {
				break;
			}
		}
		// addition to account for icons
		var regExp2 = /\x1bi\[\d+\]/;
		if (lines[i].match(regExp2)) {
			maxFontSize = Math.max(maxFontSize, 28);
		}
		// end
		textHeight += maxFontSize + 8;
	}

	this.contents.fontSize = lastFontSize;
	return textHeight;
};

Window_AchievementAlert.prototype.drawSimpleAlert = function() {
	var text1 = this.getTitle();
	var x1 = (this.contentsWidth() - this.textWidthEx(text1)) / 2;
	var y1 = 0;
	this.resetFontSettings();
	var height1 = this.textHeightEx(text1, 0, 0);
	this.drawTextEx(text1, x1, y1);
	this.drawHorzLine(height1 + this.lineHeight() / 2);
	var text2 = this.getVocab();
	var x2 = (this.contentsWidth() - this.textWidthEx(text2)) / 2;
	var y2 = this.lineHeight() * 2;
	this.resetFontSettings();
	var height2 = this.textHeightEx(text2, 0, 0);
	this.drawTextEx(text2, x2, y2);
	return height1 + this.lineHeight() + height2;
};

Window_AchievementAlert.prototype.drawRewardsAlert = function() {
	var height = this.drawSimpleAlert();
	var text = Horsti.AS.alertVocabAchievementReward;
	var x = (this.contentsWidth() - this.textWidthEx(text)) / 2;
	var y = height;
	this.drawTextEx(text, x, y);
};

Window_AchievementAlert.prototype.drawHorzLine = function(y) {
	var width = this.contentsWidth();
	var height = 4;
	var x = 0;
	var color1 = this.textColor(Horsti.AS.horzLineColor1);
	var color2 = this.textColor(Horsti.AS.horzLineColor2);
	this.contents.gradientFillRect(x, y, width, height, color1, color2);
};

Window_AchievementAlert.prototype.getTitle = function() {
	if (this._mode === 'reward') return '%1\\i\[163\]'.format(this._data.getPoints());
	return this._data.getTitle();
};

Window_AchievementAlert.prototype.getVocab = function() {
	if (this._mode === 'completion') return Horsti.AS.alertVocabCompletion;
	if (this._mode === 'progress') return Horsti.AS.alertVocabProgress;
	if (this._mode === 'reward') return Horsti.AS.alertVocabPointReward;
	return '';
};

Window_AchievementAlert.prototype.playSound = function() {
	if (!Horsti.AS.alertSeName) return;
	var se = {
		name: Horsti.AS.alertSeName,
		volume: Horsti.AS.alertSeVolume,
		pitch: Horsti.AS.alertSePitch,
		pan: Horsti.AS.alertSePan
	};
	AudioManager.playSe(se);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Game_Interpreter.prototype.achievement = function(index) {
	return $gameParty.achievement(index);
};

Game_Interpreter.prototype.achievementCategory = function(key) {
	if (!Number(key)) return $gameParty.achievements().categoryByTitle(key);
	return $gameParty.achievementCategory(Number(key));
};

Horsti.AS.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	Horsti.AS.Game_Interpreter_pluginCommand.call(this, command, args);
	if (command.match(/ACHIEVEMENTS?/i)) {
		var line = Horsti.Utils.makeString(args);

		if (line.match(/ALERTS?\s+ENABLED?/i)) {
			$gameSystem.setAchievementAlertAvailability(true);
		}
		else if (line.match(/ALERTS?\s+DISABLED?/i)) {
			$gameSystem.setAchievementAlertAvailability(false);
		}

		else if (line.match(/CATEGORY\s+(.+)\s+SHOW/i)) {
			var index = RegExp.$1;
			if (Number(index) && (index <= 0 || index >= $dataAchievementCategories.length)) {
				console.error('Category %1 does not exist.'.format(index));
			}
			else this.achievementCategory(index).show();
		}
		else if (line.match(/CATEGORY\s+(.+)\s+HIDE/i)) {
			var index = RegExp.$1;
			if (Number(index) && (index <= 0 || index >= $dataAchievementCategories.length)) {
				console.error('Category %1 does not exist.'.format(index));
			}
			else this.achievementCategory(index).hide();
		}
		else if (line.match(/CATEGORY\s+(.+)\s+REVEAL/i)) {
			var index = RegExp.$1;
			if (Number(index) && (index <= 0 || index >= $dataAchievementCategories.length)) {
				console.error('Category with index %1 does not exist.'.format(index));
			}
			else this.achievementCategory(index).reveal();
		}
		else if (line.match(/CATEGORY\s+(.+)\s+CONCEAL/i)) {
			var index = RegExp.$1;
			if (Number(index) && (index <= 0 || index >= $dataAchievementCategories.length)) {
				console.error('Category with index %1 does not exist.'.format(index));
			}
			else this.achievementCategory(index).conceal();
		}

		else if (line.match(/(\d+)\s+ADD\s+(-?\d+)\s+PROGRESS/i)) {
			var index = Number(RegExp.$1);
			if (index <= 0 || index >= $dataAchievements.length) {
				console.error('Achievement with index %1 does not exist.'.format(index));
			}
			else this.achievement(index).addProgress(Number(RegExp.$2));
		}
		else if (line.match(/(\d+)\s+SET\s+(\d+)\s+PROGRESS/i)) {
			var index = Number(RegExp.$1);
			if (index <= 0 || index >= $dataAchievements.length) {
				console.error('Achievement with index %1 does not exist.'.format(index));
			}
			else this.achievement(index).setProgress(Number(RegExp.$2));
		}

		else if (line.match(/(\d+)\s+ADD\s+CATEGORY\s+(.+)/i)) {
			var index = Number(RegExp.$1);
			if (index <= 0 || index >= $dataAchievements.length) {
				console.error('Achievement with index %1 does not exist.'.format(index));
			}
			else this.achievement(index).addCategory(RegExp.$2);
		}
		else if (line.match(/(\d+)\s+SET\s+CATEGORY\s+(.+)/i)) {
			var index = Number(RegExp.$1);
			if (index <= 0 || index >= $dataAchievements.length) {
				console.error('Achievement with index %1 does not exist.'.format(index));
			}
			else this.achievement(index).setCategories(RegExp.$2);
		}
		else if (line.match(/(\d+)\s+REMOVE\s+CATEGORY\s+(.+)/i)) {
			var index = Number(RegExp.$1);
			if (index <= 0 || index >= $dataAchievements.length) {
				console.error('Achievement with index %1 does not exist.'.format(index));
			}
			else this.achievement(index).removeCategory(RegExp.$2);
		}

		else if (line.match(/(\d+)\s+SHOW/i)) {
			var index = Number(RegExp.$1);
			if (index <= 0 || index >= $dataAchievements.length) {
				console.error('Achievement with index %1 does not exist.'.format(index));
			}
			else this.achievement(index).show();
		}
		else if (line.match(/(\d+)\s+HIDE/i)) {
			var index = Number(RegExp.$1);
			if (index <= 0 || index >= $dataAchievements.length) {
				console.error('Achievement with index %1 does not exist.'.format(index));
			}
			else this.achievement(index).hide();
		}
		else if (line.match(/(\d+)\s+REVEAL/i)) {
			var index = Number(RegExp.$1);
			if (index <= 0 || index >= $dataAchievements.length) {
				console.error('Achievement with index %1 does not exist.'.format(index));
			}
			else this.achievement(index).reveal();
		}
		else if (line.match(/(\d+)\s+CONCEAL/i)) {
			var index = Number(RegExp.$1);
			if (index <= 0 || index >= $dataAchievements.length) {
				console.error('Achievement with index %1 does not exist.'.format(index));
			}
			else this.achievement(index).conceal();
		}

		else if (line.match(/SHOW/i)) {
			$gameSystem.setAchievementVisibility(true);
		}
		else if (line.match(/HIDE/i)) {
			$gameSystem.setAchievementVisibility(false);
		}
		else if (line.match(/ENABLED?/i)) {
			$gameSystem.setAchievementAvailability(true);
		}
		else if (line.match(/DISABLED?/i)) {
			$gameSystem.setAchievementAvailability(false);
		}

		else if (line.match(/OPEN|SCENE|PUSH|CALL/i)) {
			SceneManager.push(Scene_Achievements);
		}
		else {}
	}
};

//=============================================================================
// Utils
//=============================================================================

Horsti.Utils = Horsti.Utils || {};

Horsti.Utils.parseJson = function(s) {
	var result = '';
	try {
		result = JSON.parse(s);
	}
	catch (e) {
		console.error(s, e.stack);
	}
	return result;
};

Horsti.Utils.stringifyObject = function(o) {
	var result = JSON.stringify('');
	try {
		result = JSON.stringify(o);
	}
	catch (e) {
		console.error(o, e.stack);
	}
	return result;
};

Horsti.Utils.deepCopy = function(o) {
	return Horsti.Utils.parseJson(Horsti.Utils.stringifyObject(o));
};

Horsti.Utils.makeString = function(array) {
	var string = '';
	for (var i = 0; i < array.length; i++) string += (array[i] + ' ');
	return string.trim();
};

Horsti.Utils.evalCode = function(code, errorMsg) {
	var party = $gameParty;
	var v = $gameVariables._data;
	var s = $gameSwitches._data;
	try {
		eval(code);
	}
	catch (e) {
		console.error(errorMsg);
		console.error(code);
		console.error(e.stack());
	}
};

//=============================================================================
// End of file
//=============================================================================
