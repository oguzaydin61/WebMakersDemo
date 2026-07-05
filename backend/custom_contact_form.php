<?php
/**
 * Plugin Name: Custom Contact Form
 * Description: Custom REST API Endpoint and Custom Post Type for the React frontend contact form.
 * Version: 1.0
 * Author: Oguzhan Aydin
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * 1. ENTEGRASYON: Gelen Formlar İçin Özel Bir Custom Post Type Oluşturma (Almanca)
 */
function register_contact_messages_cpt() {
    $labels = array(
        'name'               => 'Kontaktanfragen',
        'singular_name'      => 'Kontaktanfrage',
        'menu_name'          => 'Kontaktanfragen',
        'all_items'          => 'Alle Anfragen',
        'view_item'          => 'Anfrage anzeigen',
        'search_items'       => 'Anfragen suchen',
        'not_found'          => 'Keine Anfragen gefunden',
        'not_found_in_trash' => 'Keine Anfragen im Papierkorb gefunden'
    );

    $args = array(
        'labels'             => $labels,
        'public'             => false, // Nur im Admin-Bereich sichtbar
        'show_ui'            => true,
        'show_in_menu'       => true,
        'menu_icon'          => 'dashicons-email-alt',
        'supports'           => array( 'title', 'editor' ),
    );

    register_post_type( 'contact_message', $args );
}
add_action( 'init', 'register_contact_messages_cpt' );


/**
 * 2. ENTEGRASYON: Custom REST API Endpoint (Geliştirici Notları İngilizce/Almanca)
 */
function register_custom_contact_route() {
    register_rest_route( 'custom/v1', '/contact', array(
        'methods'             => 'POST',
        'callback'            => 'handle_custom_contact_form_submission',
        'permission_callback' => '__return_true', // Öffentlich zugänglich für das Formular
    ));
}
add_action( 'rest_api_init', 'register_custom_contact_route' );


/**
 * 3. ENTEGRASYON: Form Gönderildiğinde Çalışacak PHP Fonksiyonu (Hata Mesajları Almanca)
 */
function handle_custom_contact_form_submission( WP_REST_Request $request ) {
    // Validierung und Bereinigung der Eingabedaten (Sanitization)
    $email       = sanitize_email( $request->get_param( 'email' ) );
    $text        = sanitize_textarea_field( $request->get_param( 'text' ) );
    $adresse     = sanitize_text_field( $request->get_param( 'adresse' ) );
    $team        = sanitize_text_field( $request->get_param( 'team' ) );
    $datenschutz = $request->get_param( 'datenschutz' );

    // Validierung der Pflichtfelder
    if ( empty( $email ) || empty( $text ) || !$datenschutz ) {
        return new WP_Error( 
            'missing_fields', 
            'Bitte füllen Sie alle Pflichtfelder aus und akzeptieren Sie die Datenschutzbestimmungen.', 
            array( 'status' => 400 ) 
        );
    }

    // Speichern der Nachricht in der WordPress-Datenbank
    $post_id = wp_insert_post( array(
        'post_title'   => 'Anfrage von: ' . $email,
        'post_content' => "Gewählte Adresse: $adresse\nZugewiesenes Team: $team\n\nNachricht:\n$text",
        'post_status'  => 'publish',
        'post_type'    => 'contact_message',
    ));

    if ( is_wp_error( $post_id ) ) {
        return new WP_REST_Response( array( 
            'success' => false, 
            'message' => 'Datenbankfehler beim Speichern der Anfrage.' 
        ), 500 );
    }

    // Erfolgreiche Rückmeldung an das Frontend
    return new WP_REST_Response( array( 
        'success' => true, 
        'message' => 'Ihre Nachricht wurde erfolgreich übermittelt!' 
    ), 200 );
}