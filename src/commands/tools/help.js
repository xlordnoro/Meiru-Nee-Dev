//Loads the required libraries or files to externally load for the command.

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

//Create slash command and display a message containing all of the commands available for Mieru-Nee-Main presently.

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(
      "Shows a list of the available commands for Mieru-Nee-Dev."
    ),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`Available Commands`)
      .setDescription(
        `**Normal Commands:**\n\n **/help** Displays the command list.\n\n **/ping** Displays the ping latency between the API and the user.\n\n **Mod commands:**\n\n **/database** Allows users to add information to the database (Requires the Lead Developer role).\n\n **/jailee** Allows mods to grant troublesome users the jailee role before they're banned (Requires Developer role.)\n\n **/jailer_embed** Creates an embed for a hidden channel in the server (Requires the Developer role).\n\n **/roles_embed** Creates an embed in the roles channel (Requires the Developer role).\n\n **/ssl_check** Checks the ssl certificate status of a website (Requires the Developer role).\n\n **/weapons_embed** Creates an embed for a hidden channel in the server (Requires the Developer role).`
      )
      .setColor('#3498db');

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
