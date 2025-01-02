//Define any of the required libraries or files to externally load/call for the command here.

const {
  MessageFlags,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles_embed")
    .setDescription("Creates roles embed."),
  async execute(interaction, client) {
    const { roles } = interaction.member;
      const role = await interaction.guild.roles
        .fetch("1073460830110228611")
        .catch(console.error);

//Cross-checks the fetch from earlier and if the user has the role, run the command. Otherwise, print a message to the user stating they lack the role required.
    if (roles.cache.has("1073460830110228611")) {
    const embed = new EmbedBuilder()
      .setTitle(`Roles`)
      .setDescription(`Please click the button below to grant yourself the debugger role to view the other channels on the server.`)
      .setColor('#3498db')

//Create button to grant users the debugger role.

    const buttons = new ActionRowBuilder().setComponents([
      new ButtonBuilder()
        .setCustomId("debugger_role")
        .setLabel("Debugger")
        .setStyle(ButtonStyle.Success),
    ]);

    await interaction.reply({
      content: `Message sent.`,
      flags: MessageFlags.Ephemeral,
    });

//Sends output to welcome channel. Otherwise, print message stating the user lacks the required role.

    const channel = client.channels.cache.get('1073468168909095003');
    channel.send({content: `@everyone`, embeds: [embed], components: [buttons]});
  } else {
    await interaction.reply({
      content: `You do not have the ${role.name} role.`,
    });
  }
}
};
