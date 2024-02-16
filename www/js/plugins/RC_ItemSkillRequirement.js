/*:
 * @plugindesc v1.0.0 Allows skills to have item requirements to use them. <RC_ItemSkillRequirement>
 * @author renancacao
 * 
 * @help
 * ============================================================================
 * Set required item id on skill note.
 * Example:
 * <itemId: id1,id2>
 * 
 * ============================================================================
 * 
 */

(function () {

    Game_BattlerBase.prototype.meetsSkillConditions = function (skill) {
        return (this.meetsUsableItemConditions(skill) &&
            this.hasNecessaryItems(skill) &&
            this.isSkillWtypeOk(skill) && this.canPaySkillCost(skill) &&
            !this.isSkillSealed(skill.id) && !this.isSkillTypeSealed(skill.stypeId));
    };

    Game_BattlerBase.prototype.hasNecessaryItems = function (skill) {
        var itemIds = skill.meta.itemId;

        if (!itemIds) {
            return true;
        }
        else {
            return itemIds.split(",").every(function (itemId) {
                return $gameParty.hasItem($dataItems[itemId], true);
            });
        }
    };

})();