const https = require('https');
const { parseISO, differenceInDays } = require('date-fns');
const cron = require('node-cron');
const { EmbedBuilder } = require('discord.js');

// Replace with your website URL
const websiteURL = 'https://hi10anime.com';

// Function to execute the SSL check command
module.exports = async (client) => {
  const executeSslCheckCommand = async () => {
    try {
      const req = https.request(websiteURL, async (res) => {
        const certificate = res.socket.getPeerCertificate();
        const expirationDate = parseISO(certificate.valid_to);

        if (expirationDate) {
          const daysRemaining = differenceInDays(expirationDate, new Date());

          const guild = await client.guilds.fetch('1073459808696537140').catch(console.error);
          if (!guild) {
            console.error(`:x: The specified guild (${guild}) is not found.`);
            return;
          }

          const channel = await guild.channels.fetch('1132710931336528023').catch(console.error);
          if (!channel) {
            console.error(`:x: The specified channel (${channel}) is not found.`);
            return;
          }

          // Send the embed to the specified channel if daysRemaining <= 7
          if (daysRemaining <= 7) {
            // Prepare the embed for the SSL check result
            const embed = new EmbedBuilder()
              .setTitle('SSL Certificate Status')
              .setDescription(`:warning: SSL certificate for ${websiteURL} will expire in ${daysRemaining} days.`)
              .setColor('#FF0000');

            // Send the embed with a mention to a role
            await channel.send({ embeds: [embed], content: '<@&1073460830110228611>', allowedMentions: { roles: ['1073460830110228611'] } });
            console.log('Embed sent successfully!');
          } else {
            console.log(`:white_check_mark: SSL certificate for ${websiteURL} is valid and not expiring soon.`);
          }
        } else {
          console.error(':x: Unable to retrieve SSL certificate information.');
        }
      });

      req.on('error', (error) => {
        console.error('An error occurred while checking the SSL certificate:', error);
        console.log(':x: The SSL certificate for the website has already expired.');
      });

      req.end();
    } catch (error) {
      console.error('An error occurred while checking the SSL certificate:', error);
      console.log(':x: An error occurred while checking the SSL certificate.');
    }
  };

  // Schedule the command to run daily at 7:00 a.m.
  cron.schedule('0 7 * * *', () => {
    console.log('Running SSL certificate check...');
    executeSslCheckCommand();
  });
};