import {saveNewsletterEmail} from '@/services/subscribe'
import {ActionError, defineAction} from 'astro:actions'
import {z} from 'astro:schema'

export const server = {
	newsletter: defineAction({
		input: z.object({
			email: z.string().email('Lo siento, el correo electrónico no es válido.'),
		}),
		async handler({email}) {
			const {success, duplicated, error} = await saveNewsletterEmail(email)

			if (!success) {
				throw new ActionError({
					code: 'BAD_REQUEST',
					message: error ?? 'Error al guardar el email',
				})
			}

			if (duplicated) {
				return {success: true, message: 'Este correo ya está suscrito'}
			}

			return {
				success: true,
				message: '¡Gracias por suscribirte a nuestro boletín!',
			}
		},
	}),
}
