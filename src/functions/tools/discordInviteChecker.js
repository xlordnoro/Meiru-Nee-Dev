const Discord = require('discord.js');

// The ID of the admin role that can approve invite links
const adminRoleId = '1074229659119661058';

module.exports = async (client) => {
    // Listen for message events
    client.on('messageCreate', async message => {
        try {
            // Check if message is defined and not null
            if (!message) {
                console.error('Message is null or undefined.');
                return;
            }

            // Ignore messages from bots
            if (message.author.bot) {
                return;
            }

            // Check if the message contains an invite link
            if (message.content.match(/discord.gg\/\w+/i)) {
                // Check if the author of the message is an admin
                const member = message.member;
                if (!member) {
                    console.error('Member is null or undefined.');
                    return;
                }

                const isAdmin = member.roles.cache.some(role => role.id === adminRoleId);

                if (!isAdmin) {
                    // Inform the user that they need admin approval
                    await message.reply('You do not have permission to post invite links. Please contact an admin for approval.');

                    // Delete the message containing the invite link
                    await message.delete();
                    console.log('Deleted message containing unauthorized invite link.');
                } else {
                    console.log('User has admin role.');
                }
            }
        } catch (error) {
            console.error('Error in handleInviteLinks:', error);
        }
    });
};